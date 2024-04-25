import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

import emitter from '../../utils/event';
import { BrowseProps, DeviceType, setDevice, Util } from '../../utils/utilx';

import '../../../locales/i18n';

import { useMemo } from 'react';
import { css } from '@emotion/css';
import { debounce } from 'lodash';

import { getPageTheme, setPageSettings } from '../../components/page';
// import { useTranslation } from 'react-i18next';

import { dmeConfig } from '../../config';
import { BlockListRender } from '../../main/renderer';
import SettingPanel from '../../setting-panel';
import { TopBar } from '../../topbar/Topbar';
import { DME, DMEData } from '../../types/dmeditor';
import { registerDefaultWidgets } from '../../utils/register';
import { useEditorStore } from '../store';
import { loadData } from '../store/helper';
import { EditArea, EditContainer, EmtpyBlock, Layout, Root, SettingContainer } from './style';

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

// registerDefaultWidgets();
registerDefaultWidgets();

export const DMEditor = React.forwardRef((props: DMEditorProps, currentRef: React.Ref<any>) => {
  // const [blocks, setBlocks] = useState(props.data ? [...props.data] : []);
  useImperativeHandle(
    currentRef,
    () => ({
      setEditorJson: (data: string | Array<DMEData.Block>) => {
        const list = loadData(data);
        emitter.emit('setWidgets', list);
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

  const [viewmode, setViewmode] = useState('edit');

  const [settingsShown, setSettingsShown] = useState(false);
  const {
    selected: { blockIndex: selectedBlockIndex },
    storage,
    updateSelectedBlockIndex,
    setStorage,
    clearSelected,
    setPageData,
    page,
  } = useEditorStore();
  const blockIndexRef = useRef(selectedBlockIndex);

  Util.fileUrl = props.getFileUrl;
  Util.imageUrl = props.getImageUrl;

  const handleUpdateSelctedWidgetIndex = useCallback((index: number) => {
    updateSelectedBlockIndex([index], storage[index].id || '');
    blockIndexRef.current = index;
  }, []);

  const handleUpdateWidgets = useCallback((data: DMEData.Block[]) => {
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
    emitter.addListener('updateSelectedWidgetIndex', handleUpdateSelctedWidgetIndex);
    emitter.addListener('setWidgets', handleUpdateWidgets);
    return () => {
      emitter.removeListener('updateSelectedWidgetIndex');
      emitter.removeListener('setWidgets');
      emitter.removeListener('save');
      emitter.removeListener('cancel');
    };
  }, []);

  useEffect(() => {
    // if (selectedBlockIndex !== blockIndexRef.current) {
    //   handleWidgetIndexChange(selectedBlockIndex);
    // }
  }, [selectedBlockIndex]);

  const handleWidgetIndexChange = debounce((index: number) => {
    emitter.emit('updateSelectedWidgetIndex', index);
  }, 0.1e3);

  const emitCurrentElements = debounce((elements: any) => {
    emitter.emit('currentElements', elements);
  }, 0.1e3);

  const onActiveIndexChanged = debounce((index: number) => {
    emitter.emit('activeIndexChanged', index);
  }, 0.1e3);

  useEffect(() => {
    if (selectedBlockIndex !== blockIndexRef.current) {
      onActiveIndexChanged(selectedBlockIndex);
    }
  }, [selectedBlockIndex]);

  const showSettings = (e: any) => {
    e.preventDefault();
    setSettingsShown(!settingsShown);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);

  // reset to initial status
  const resetStatus = () => {
    clearSelected();
  };

  const onChangeViewMode = (e: any, type: string) => {
    e.preventDefault();
    setViewmode(type);
    if (type == 'pc') {
      setDevice('');
    } else {
      setDevice(type as DeviceType);
    }
    setSettingsShown(false);
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

  return (
    <Root uiConfig={dmeConfig.editor.ui}>
      <ThemeProvider theme={outerTheme}>
        <TopBar />
        <Layout.Main ref={currentRef}>
          {/* <Toolbar readonlyMode={false} /> */}

          {/* <div className="dme-settings" style={{ display: settingsShown ? 'block' : 'none' }}>
          <div>{Util.renderPageTab()}</div>
        </div> */}

          <Layout.Edit>
            <EditContainer
              ref={containerRef}
              style={settingsShown ? { display: 'none' } : {}}
              onClick={resetStatus}
            >
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
                {viewmode === 'edit' && (
                  <div
                    style={getEditCssVariables()}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <BlockListRender blockData={storage} path={[]} mode="edit" />
                  </div>
                )}
                {/* {viewmode !== 'edit' && (
              <DMEditorView
                key={viewmode}
                data={storage}
                getFileUrl={props.getFileUrl}
                getImageUrl={props.getImageUrl}
              />
            )} */}
              </EditArea>
            </EditContainer>
          </Layout.Edit>
          <Layout.SettingPanel>
            <SettingContainer>
              <SettingPanel />
            </SettingContainer>
          </Layout.SettingPanel>
        </Layout.Main>
      </ThemeProvider>
    </Root>
  );
});
