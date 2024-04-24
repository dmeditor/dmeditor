import * as React from 'react';

import { BlockRender } from '../renderer/BlockRender';
import { dmeditorEditCss, dmeditorViewCss, setMainWidthCssVariable } from './DMEditor.css';

import '../initialize';

import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, createTheme, IconButton, ThemeProvider, Tooltip } from '@mui/material';
import { deepOrange, green, grey, orange } from '@mui/material/colors';
import emitter from 'dmeditor/utils/event';
import {
  BrowseProps,
  DeviceType,
  generatedWidgetAttrs,
  isServer,
  sanitizeBlockData,
  setDevice,
  useGetDevice,
  Util,
} from 'dmeditor/utils/utilx';

import { getDef, newBlockData } from '../../../ToolDefinition';
import { PropertyTab } from '../../components/property-tab/Tab';
import { MenuList } from '../../components/widgets/menu-list/MenuList';

import '../../../locales/i18n';

import { useMemo } from 'react';
import { css } from '@emotion/css';
import { getPageTheme, setPageSettings } from 'dmeditor/components/page';
import { registerDefaultWidgets } from 'dmeditor/components/widgets';
import { BlockListRender } from 'dmeditor/main/renderer';
import { DME, DMEData } from 'dmeditor/types/dmeditor';
import { isStrictlyInfinity, jsonParse } from 'dmeditor/utils';
import i18next from 'i18next';
import { produce } from 'immer';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import { dmeConfig } from '../../config';
import SettingPanel from '../../setting-panel';
import Toolbar from '../../toolbar';
import { TopBar } from '../../topbar/Topbar';
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

export interface DMEditorViewProps {
  // data: Array<any>;
  // toast?: {
  //   error: (message: string, options: any) => void;
  //   message: (message: string, options: any) => void;
  // };
  // getFileUrl?: (path: string) => string;
  // getImageUrl?: (path: string) => string;
}

registerDefaultWidgets();

export const DMEditor = React.forwardRef((props: DMEditorProps, currentRef) => {
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
  // element includes all layouts and widgets
  // const [widgets, setWidgets] = useState(() => {
  //   if (Array.isArray(props.data) && props.data.length > 0) {
  //     return props.data;
  //   } else {
  //     return [];
  //   }
  // });

  // const [selectedWidgetIndex, setSelectedWidgetIndex] = useState(
  //   widgets.length > 0 ? 0 : -Infinity,
  // );
  // const [widgetIndex, setWidgetIndex] = useState(0);

  const [newBlock, setNewBlock] = useState(false);
  const [viewmode, setViewmode] = useState('edit');

  const [settingPanelWidth, setSettingPanelWidth] = useState<number>(-1);
  const [settingsShown, setSettingsShown] = useState(false);
  const {
    selected: { blockIndex: selectedBlockIndex },
    storage,
    getSelectedBlock,
    updateSelectedBlockIndex,
    setStorage,
    clearSelected,
    setPageData,
    page,
  } = useEditorStore();
  const blockIndexRef = useRef(selectedBlockIndex);
  // const blocksRef = useRef(blocks); //use ref to avoid data issue when it's debounce change.
  const { t, i18n } = useTranslation();

  Util.fileUrl = props.getFileUrl;
  Util.imageUrl = props.getImageUrl;
  // useEffect(() => {
  //   if (props.lang) {
  //     i18n.changeLanguage(props.lang);
  //   }
  //   Util.BrowseImage = props.browseImage;
  //   Util.BrowseLink = props.browseLink;
  //   Util.CustomProperty = props.customProperty;
  //   Util.PreBlock = props.preBlock;
  //   Util.pageTab = props.pageTab;
  //   Util.toast = props.toast;
  //   Util.pageTabActiveIndex = props.pageTabActiveIndex || 0;
  // }, []);
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

  const createNewWidget = (type: string, template?: string) => {
    let widget;
    try {
      widget = generatedWidgetAttrs(type);
      return widget;
    } catch (err) {
      console.warn(err);
      return;
    }
  };

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

export const DMEditorView = (props: DMEditorViewProps) => {
  const elRef = useRef(null);
  const [width, setWidth] = useState(0);

  Util.toast = props.toast;
  Util.fileUrl = props.getFileUrl;
  Util.imageUrl = props.getImageUrl;
  const device = useGetDevice();

  useEffect(() => {
    if (!elRef?.current) {
      return;
    }
    const width = (elRef.current as any).clientWidth;
    setWidth(width);
  }, []);

  return (
    <div
      ref={elRef}
      className={
        'dmeditor-view ' +
        setMainWidthCssVariable(width + 'px') +
        ' ' +
        dmeditorViewCss +
        (device != '' ? ' dmeditor-view-' + device + ' ' : '')
      }
    >
      {props.data.map((block, index) => {
        const blockElement = () => {
          return (
            <BlockRender
              data={block}
              active={false}
              onCancel={() => {}}
              key={block.id}
              onActivate={() => {}}
              onChange={() => {}}
              onAddAbove={() => {}}
              onAddUnder={() => {}}
              view={true}
            />
          );
        };
        return blockElement();
      })}
    </div>
  );
};

/** server side load */
export const serverLoad = async (data: Array<any>, context?: any) => {
  let proms: Array<Promise<any>> = [];
  for (let i in data) {
    let blockData = data[i];
    let type = blockData.type;
    let def = getDef(type);
    if (def.onServerLoad) {
      proms = [...proms, def.onServerLoad(blockData, context)];
    } else {
      proms = [...proms, blockData];
    }
  }

  try {
    let newData = await Promise.all(proms);
    return newData;
  } catch (error) {
    console.error(error);
    throw 'Failed to fetch data';
  }
};
