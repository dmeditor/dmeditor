import * as React from 'react';
import { ComponentType, useMemo } from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { LaptopMacOutlined, PhoneIphoneOutlined } from '@mui/icons-material';
import { Button, ThemeProvider, Tooltip } from '@mui/material';
import useResizeObserver from '@react-hook/resize-observer';
import { i18n } from 'dmeditor/core/i18n';
import { useResizable } from 'react-resizable-layout';

import { getPageTheme, setPageSettings } from '../../components/page';
import { dmeConfig } from '../../config';
import { DeviceType, setDevice, useDevice } from '../../hooks/useDeivce';
import { BlockListRender, DMEditorView } from '../../main/renderer';
import SettingPanel from '../../setting-panel';
import { TopBar } from '../../topbar/Topbar';
import { DME, DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { useEditorStore } from '../store';
import { loadData } from '../store/helper';
import { EditSideTools } from './EditSideTools';
import { LayoutRender } from './LayoutRender';
import { muiTheme } from './muiTheme';
import {
  EditContainer,
  EditContentArea,
  EmtpyBlock,
  Layout,
  Root,
  SettingContainer,
  View,
} from './style';
import { ViewDevices } from './ViewDevices';

export interface DMEditorProps {
  projectStyle?: string;
  onSave?: (savedData: DMEData.SavedData) => void;
  onChange?: (savedData: DMEData.SavedData) => void;
  onCancel?: (callback: () => void) => void;
}

export interface DMEditorRefType {
  setData: (data: string | Array<DMEData.Block>) => void;
  setPageSettings: (settings: Array<DME.PageSetting | ComponentType>) => void;
  setPageData: (data: DMEData.Page) => void;
}

const previewDeviceWidths = {
  pc: [1200, 1000],
  tablet: [810, 800],
  mobile: [400, 400],
};

export const ToolButton = (props) => (
  <Button
    sx={{
      textTransform: 'none',
      color: props.selected ? '#ffffff' : '#999',
      background: props.selected ? '#494d4f' : '',
      ':hover': {
        background: '#494d4f',
      },
    }}
    {...props}
  ></Button>
);

const Editor = (props: { projectStyle?: string }) => {
  const {
    separatorProps,
    position,
    isDragging: resizing,
  } = useResizable({
    axis: 'x',
    reverse: true,
    initial: dmeConfig.editor.settingPanelWidth,
    min: dmeConfig.editor.minSettingPanelWidth || 350,
    max: 600,
  });
  const { projectStyle } = props;

  const { storage, clearSelected, page } = useEditorStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const [variables, initVariables] = useState<React.CSSProperties>({});
  const getThemeCss = useMemo(() => {
    const themeIdentifier = page.theme || dmeConfig.editor.defaultTheme;
    const theme = getPageTheme(themeIdentifier);
    if (theme) {
      return css(theme.cssStyle);
    }
    return '';
  }, [page.theme]);

  const resetStatus = () => {
    clearSelected();
  };
  const setVariables = useCallback(() => {
    const container = containerRef.current;
    const editor = editRef.current;

    if (container && editor) {
      const width = editor.offsetWidth;
      const containerWidth = container.offsetWidth;

      const style = {
        '--dme-main-width': `${width}px`,
        '--dme-container-width': `${containerWidth}px`,
      } as React.CSSProperties;

      initVariables(style);
    }
  }, []);

  useResizeObserver(containerRef, setVariables);

  const currentDevice = useDevice();

  const switchEditDevice = (device: 'desktop' | 'mobile') => {
    setDevice(device === 'mobile' ? device : '');
    setVariables();
  };

  return (
    <Layout.Main
      config={{ zIndex: dmeConfig.editor.zIndex }}
      settingWidth={position}
      resizing={resizing}
    >
      <Layout.Edit onClick={resetStatus}>
        <Layout.EditModeBar className={dmeConfig.editor.panelClassNames['devices']}>
          <ToolButton
            selected={currentDevice === ('desktop' as DeviceType)}
            onClick={(e) => {
              e.stopPropagation();
              switchEditDevice('desktop');
            }}
          >
            <Tooltip
              title={i18n('Default mode')}
              placement="left"
              enterDelay={800}
              enterNextDelay={800}
            >
              <LaptopMacOutlined />
            </Tooltip>
          </ToolButton>
          <ToolButton
            selected={currentDevice === 'mobile'}
            onClick={(e) => {
              e.stopPropagation();
              switchEditDevice('mobile');
            }}
          >
            <Tooltip
              title={i18n('Mobile mode')}
              placement="left"
              enterDelay={800}
              enterNextDelay={800}
            >
              <PhoneIphoneOutlined />
            </Tooltip>
          </ToolButton>
        </Layout.EditModeBar>
        <EditContainer
          ref={containerRef}
          className={dmeConfig.editor.panelClassNames['edit-container']}
          width={currentDevice === 'mobile' ? previewDeviceWidths.mobile[0] + 'px' : undefined}
        >
          <EditContentArea
            ref={editRef}
            maxWidth={currentDevice === 'mobile' ? previewDeviceWidths.mobile[1] + 'px' : undefined}
            hideEditBorder={currentDevice === 'mobile'}
            className={
              dmeConfig.editor.panelClassNames['edit-content'] ||
              '' +
                css(dmeConfig.general.projectStyles[projectStyle || 'default']) +
                ' ' +
                getThemeCss
            }
          >
            {/* need EmptyBlock otherwise first block's margin-top is based on body */}
            <EmtpyBlock />
            <div
              style={variables}
              className={
                'dmeditor-view ' +
                (currentDevice != '' ? 'dme-viewmode-' + currentDevice + ' ' : '')
              }
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <LayoutRender list={storage} mode="edit" />
            </div>
          </EditContentArea>
        </EditContainer>
        <EditSideTools />
      </Layout.Edit>
      <Layout.Separator {...separatorProps} resizing={resizing} />
      <Layout.SettingPanel>
        <SettingContainer>
          <SettingPanel />
        </SettingContainer>
      </Layout.SettingPanel>
    </Layout.Main>
  );
};

export const DMEditor = React.forwardRef(
  (props: DMEditorProps, currentRef: React.ForwardedRef<DMEditorRefType>) => {
    useImperativeHandle(
      currentRef,
      () => ({
        setData: (data: string | Array<DMEData.Block>) => {
          const list = loadData(data);
          emitter.emit('setStorage', list);
        },
        setPageSettings: (settings: Array<DME.PageSetting | ComponentType>) => {
          setPageSettings(settings);
        },
        setPageData: (data: DMEData.Page) => {
          setPageData(data);
        },
      }),
      [],
    );

    const { projectStyle, onChange, onSave, onCancel } = props;

    const [viewDevice, setViewDevice] = useState('pc');

    const { storage, setStorage, setPageData, page, mode } = useEditorStore();

    const reset = useEditorStore((state) => state.reset);
    useEffect(() => {
      reset();
      return () => {
        if (currentRef?.current) {
          currentRef.current = null;
        }
      };
    }, [reset]);

    const handleUpdateStorage = useCallback((data: DMEData.Block[]) => {
      setStorage(data);
    }, []);

    useEffect(() => {
      emitter.addListener('setStorage', handleUpdateStorage);

      if (onSave) {
        emitter.addListener('save', onSave);
      }

      if (onChange) {
        emitter.addListener('change', onChange);
      }

      if (onCancel) {
        emitter.addListener('cancel', onCancel);
      }

      return () => {
        emitter.removeListener('setStorage');
        if (onSave) {
          emitter.removeListener('save');
        }

        if (onChange) {
          emitter.removeListener('change');
        }

        if (onCancel) {
          emitter.removeListener('cancel');
        }
      };
    }, []);

    useEffect(() => {
      if (onChange) {
        emitter.emit('change', { data: storage, page: page });
      }
    }, [storage]);

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

    const renderView = () => {
      return (
        <Layout.View>
          <ViewDevices onChange={(v) => changeViewDevice(v)} />
          <View.Container
            containerWidth={previewDeviceWidths[viewDevice][0]}
            contentWidth={previewDeviceWidths[viewDevice][1]}
          >
            <DMEditorView data={storage} projectStyle={projectStyle} />
          </View.Container>
        </Layout.View>
      );
    };

    return (
      <Root uiConfig={dmeConfig.editor.ui} ref={currentRef}>
        <ThemeProvider theme={muiTheme}>
          <TopBar />
          {mode === 'edit' ? <Editor projectStyle={projectStyle} /> : renderView()}
        </ThemeProvider>
      </Root>
    );
  },
);
