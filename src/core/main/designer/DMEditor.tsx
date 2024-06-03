import * as React from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { ThemeProvider } from '@mui/material';
import { useResizable } from 'react-resizable-layout';

import { getPageTheme, setPageSettings } from '../../components/page';
import { dmeConfig } from '../../config';
import { DeviceType, setDevice } from '../../hooks/useDeivce';
import { BlockListRender, DMEditorView } from '../../main/renderer';
import SettingPanel from '../../setting-panel';
import { TopBar } from '../../topbar/Topbar';
import { DME, DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { useEditorStore } from '../store';
import { loadData } from '../store/helper';
import { muiTheme } from './muiTheme';
import { EditArea, EditContainer, EmtpyBlock, Layout, Root, SettingContainer, View } from './style';
import { ViewDevices } from './ViewDevices';

export interface DMEditorProps {
  projectStyle?: string;
  onSave?: (
    callback: (savedData: { data: Array<DMEData.Block>; page: DMEData.Page }) => void,
  ) => void;
  onCancel?: (callback: () => void) => void;
}

export interface DMEditorRefType {
  setData: (data: string | Array<DMEData.Block>) => void;
  setPageSettings: (settings: Array<DME.PageSetting>) => void;
  setPageData: (data: DMEData.Page) => void;
}

export const DMEditor = React.forwardRef(
  (props: DMEditorProps, currentRef: React.Ref<DMEditorRefType>) => {
    useImperativeHandle(
      currentRef,
      () => ({
        setData: (data: string | Array<DMEData.Block>) => {
          const list = loadData(data);
          emitter.emit('setStorage', list);
        },
        setPageSettings: (settings: Array<DME.PageSetting>) => {
          setPageSettings(settings);
        },
        setPageData: (data: DMEData.Page) => {
          setPageData(data);
        },
      }),
      [],
    );
    const {
      separatorProps,
      position,
      isDragging: resizing,
    } = useResizable({
      axis: 'x',
      reverse: true,
      initial: 350,
      min: 350,
      max: 600,
    });

    const [viewDevice, setViewDevice] = useState('pc');

    const { storage, setStorage, clearSelected, setPageData, page, mode } = useEditorStore();

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

      if (props.onSave) {
        emitter.addListener('save', props.onSave);
      }

      if (props.onCancel) {
        emitter.addListener('cancel', props.onCancel);
      }

      return () => {
        emitter.removeListener('setStorage');
        if (props.onSave) {
          emitter.removeListener('save');
        }

        if (props.onCancel) {
          emitter.removeListener('cancel');
        }
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

    const previewDeviceWidths = {
      pc: [1200, 1000],
      tablet: [810, 800],
      mobile: [400, 400],
    };

    const renderEdit = () => {
      return (
        <Layout.Main
          config={{ zIndex: dmeConfig.editor.zIndex }}
          ref={currentRef}
          settingWidth={position}
          resizing={resizing}
        >
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
          <Layout.Separator {...separatorProps} resizing={resizing} />
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
          <View.Container
            containerWidth={previewDeviceWidths[viewDevice][0]}
            contentWidth={previewDeviceWidths[viewDevice][1]}
          >
            <DMEditorView data={storage} projectStyle={props.projectStyle} />
          </View.Container>
        </Layout.View>
      );
    };

    return (
      <Root uiConfig={dmeConfig.editor.ui}>
        <ThemeProvider theme={muiTheme}>
          <TopBar />
          {mode === 'edit' ? renderEdit() : renderView()}
        </ThemeProvider>
      </Root>
    );
  },
);
