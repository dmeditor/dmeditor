import * as React from 'react';
import { useMemo } from 'react';
import { css } from '@emotion/css';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { debounce } from 'lodash';

import { getPageTheme, setPageSettings } from '../../components/page';
// import { useTranslation } from 'react-i18next';

import { dmeConfig } from '../../config';
import { DeviceType, setDevice } from '../../hooks/useDeivce';
import { BlockListRender, DMEditorView } from '../../main/renderer';
import SettingPanel from '../../setting-panel';
import { TopBar } from '../../topbar/Topbar';
import { DME, DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { BrowseProps, Util } from '../../utils/utilx';
import { useEditorStore } from '../store';
import { loadData } from '../store/helper';
import { EditArea, EditContainer, EmtpyBlock, Layout, Root, SettingContainer, View } from './style';
import { ViewDevices } from './ViewDevices';

const { useCallback, useEffect, useImperativeHandle, useRef, useState } = React;

export interface DMEditorProps {
  data: Array<any>;
  projectStyle?: string;
  menu?: React.ReactElement;
  lang?: string; //default 'eng-GB'
  onChangeActive?: (activeBlock: Number) => void;
  onChange?: (data: Array<any>) => void;
  browseImage?: (props: BrowseProps) => JSX.Element;
  browseLink?: (props: BrowseProps) => JSX.Element;
  customProperty?: (props: any) => JSX.Element;
  preBlock?: (props: any) => JSX.Element;
  pageTab?: () => JSX.Element;
  toast?: {
    error: (message: string, options: any) => void;
    message: (message: string, options: any) => void;
  };
  pageTabActiveIndex?: number;
  getFileUrl?: (path: string) => string;
  getImageUrl?: (path: string) => string;
}

export const DMEditor = React.forwardRef((props: DMEditorProps, currentRef: React.Ref<any>) => {
  // const [blocks, setBlocks] = useState(props.data ? [...props.data] : []);
  useImperativeHandle(
    currentRef,
    () => ({
      setEditorJson: (data: string | Array<DMEData.Block>) => {
        const list = loadData(data);
        emitter.emit('setStorage', list);
      },
      setPageSettings: (settings: Array<DME.PageSetting>) => {
        setPageSettings(settings);
      },
      setPageData: (data: DMEData.Page) => {
        setPageData(data);
      },
      onSave: (
        callback: (savedData: { data: Array<DMEData.Block>; page: DMEData.Page }) => void,
      ) => {
        emitter.addListener('save', callback);
      },
      onCancel: (callback: () => void) => {
        emitter.addListener('cancel', callback);
      },
    }),
    [],
  );

  const [viewDevice, setViewDevice] = useState('pc');

  const {
    selected: { blockIndex: selectedBlockIndex },
    storage,
    updateSelectedBlockIndex,
    setStorage,
    clearSelected,
    setPageData,
    page,
    mode,
  } = useEditorStore();
  const blockIndexRef = useRef(selectedBlockIndex);

  Util.fileUrl = props.getFileUrl;
  Util.imageUrl = props.getImageUrl;

  const handleUpdateSelctedWidgetIndex = useCallback((index: number) => {
    updateSelectedBlockIndex([index], storage[index].id || '');
    blockIndexRef.current = index;
  }, []);

  const handleUpdateStorage = useCallback((data: DMEData.Block[]) => {
    setStorage(data);
  }, []);

  const getThemeCss = useMemo(() => {
    const themeIdentifier = page.theme || dmeConfig.editor.defaultTheme;
    const theme = getPageTheme(themeIdentifier);
    if (theme) {
      return css(theme.cssStyle);
    }
    return '';
  }, [page.theme]);

  // useEffectLayout
  useEffect(() => {
    emitter.addListener('setStorage', handleUpdateStorage);
    return () => {
      emitter.removeListener('setStorage');
      emitter.removeListener('save');
      emitter.removeListener('cancel');
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);

  // reset to initial status
  const resetStatus = () => {
    clearSelected();
  };

  //when switch mode, set default device
  useEffect(() => {
    if (mode === 'view') {
      setViewDevice('pc');
    }
  }, [mode]);

  const changeViewDevice = (device: string) => {
    setViewDevice(device);
    if (device === 'pc') {
      setDevice('');
    } else {
      setDevice(device as DeviceType);
    }
  };

  const getEditCssVariables = () => {
    return containerRef?.current && editRef?.current
      ? ({
          '--dme-container-width': containerRef?.current?.offsetWidth + 'px',
          '--dme-main-width': editRef?.current?.offsetWidth + 'px',
        } as React.CSSProperties)
      : {};
  };

  const outerTheme = createTheme({
    palette: {
      primary: deepOrange,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#777777',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#888888',
                borderWidth: 1,
              },
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'black',
            '& .MuiTooltip-arrow': {
              color: 'black',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            // '& .MuiMenu-paper':{
            //   color: 'black'
            // }
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '& .Mui-selected': {},
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            '&.MuiButton-root': {
              minWidth: '30px',
              padding: '5px',
            },
          },
        },
      },
    },
  });

  const renderEdit = () => {
    return (
      <Layout.Main config={{ zIndex: dmeConfig.editor.zIndex }} ref={currentRef}>
        <Layout.Edit>
          <EditContainer ref={containerRef} onClick={resetStatus}>
            <EditArea
              ref={editRef}
              className={
                css(dmeConfig.general.projectStyles[props.projectStyle || 'default']) +
                ' ' +
                getThemeCss
              }
            >
              {/* need EmptyBlock otherwise first block's margin-top is based on body */}
              <EmtpyBlock />
              <div
                style={getEditCssVariables()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <BlockListRender blockData={storage} path={[]} mode="edit" />
              </div>
            </EditArea>
          </EditContainer>
        </Layout.Edit>
        <Layout.SettingPanel>
          <SettingContainer>
            <SettingPanel />
          </SettingContainer>
        </Layout.SettingPanel>
      </Layout.Main>
    );
  };

  const renderView = () => {
    return (
      <Layout.View>
        <ViewDevices onChange={(v) => changeViewDevice(v)} />
        <View.Container device={viewDevice}>
          <DMEditorView data={storage} projectStyle={props.projectStyle} />
        </View.Container>
      </Layout.View>
    );
  };

  return (
    <Root uiConfig={dmeConfig.editor.ui}>
      <ThemeProvider theme={outerTheme}>
        <TopBar />
        {mode === 'edit' ? renderEdit() : renderView()}
      </ThemeProvider>
    </Root>
  );
});
