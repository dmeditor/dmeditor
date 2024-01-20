import * as React from 'react';

import { BlockRender } from '../renderer/BlockRender';
import { dmeditorEditCss, dmeditorViewCss, setMainWidthCssVariable } from './DMEditor.css';

import '../initialize';

import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, createTheme, IconButton, ThemeProvider, Tooltip } from '@mui/material';
import { green, grey } from '@mui/material/colors';

import { getDef, newBlockData } from '../../../ToolDefinition';
import { PropertyTab } from '../../components/property-tab/Tab';
import { MenuList } from '../../components/widgets/menu-list/MenuList';
import emitter from 'Core/utils/event';
import {
  BrowseProps,
  DeviceType,
  generatedWidgetAttrs,
  isServer,
  sanitizeBlockData,
  setDevice,
  useGetDevice,
  Util,
} from 'Core/utils/utilx';

import '../../../locales/i18n';

import i18next from 'i18next';
import { produce } from 'immer';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import SettingPanel from '../../setting-panel';
import Toolbar from '../../toolbar';
import { loadData } from '../entity/operations';
import { useEditorStore } from '../store';
import { DMEData } from 'Src/core/components/types/blocktype';
import { BlockListRender } from 'Src/core/main/renderer';
import { isStrictlyInfinity, jsonParse } from 'Src/core/utils';

const { useCallback, useEffect, useImperativeHandle, useRef, useState } = React;

export interface DMEditorProps {
  data: Array<any>;
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

export const DMEditor = React.forwardRef((props: DMEditorProps, currentRef) => {
  // const [blocks, setBlocks] = useState(props.data ? [...props.data] : []);
  useImperativeHandle(
    currentRef,
    () => ({
      setEditorJson: (data: string | Array<DMEData.Block>) => {
        const list = loadData(data);
        emitter.emit('setWidgets', list);
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
  const [settingsShown, setSettingsShown] = useState(false);
  const {
    selected: { blockIndex: selectedBlockIndex },
    storage,
    getSelectedBlock,
    updateSelectedBlockIndex,
    setStorage,
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
    updateSelectedBlockIndex(index);
    blockIndexRef.current = index;
  }, []);

  const handleUpdateWidgets = useCallback((data: DMEData.Block[]) => {
    setStorage(data);
  }, []);

  // useEffectLayout
  useEffect(() => {
    emitter.addListener('updateSelectedWidgetIndex', handleUpdateSelctedWidgetIndex);
    emitter.addListener('setWidgets', handleUpdateWidgets);
    return () => {
      emitter.removeListener('updateSelectedWidgetIndex');
      emitter.removeListener('setWidgets');
    };
  }, []);

  useEffect(() => {
    if (selectedBlockIndex !== blockIndexRef.current) {
      handleWidgetIndexChange(selectedBlockIndex);
    }
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
  /*
   * @param {string} type - type of widget
   * @param {number} index - index of widget
   */
  const addAbove = (type: string, newIndex: number, template?: string) => {
    if (type) {
      if (!!storage[newIndex]) {
      }
    }
    // if (type) {
    //   const defaultData = newBlockData(type, template);
    //   let allBlocks = [...blocks];
    //   allBlocks.splice(index, 0, defaultData);
    //   updateData(allBlocks);
    //   setNewBlock(true);
    //   setActiveBlock(index);
    // }
  };
  const updateData = (blocks: any) => {
    // blocksRef.current = blocks;
    // setBlocks(blocks);
    // if (props.onChange) {
    //   props.onChange(blocks);
    // }
  };

  // useEffect(() => {
  //   if (props.onChangeActive) {
  //     props.onChangeActive(activeBlock);
  //   }
  // }, [activeBlock]);

  const addUnder = (type: string, index: number, template?: string) => {
    // if (type) {
    //   const defaultData = newBlockData(type, template);
    //   let allBlocks = [...blocks];
    //   allBlocks.splice(index + 1, 0, defaultData);
    //   updateData(allBlocks);
    //   setNewBlock(true);
    //   setActiveBlock(index + 1);
    // }
  };

  const onDelete = () => {
    // let fullBlocks = [...blocks];
    // fullBlocks.splice(activeBlock, 1);
    // updateData(fullBlocks);
    // if (fullBlocks.length === 0) {
    //   setActiveBlock(-1);
    // } else {
    //   if (activeBlock === 0) {
    //     setActiveBlock(0);
    //   } else {
    //     setActiveBlock(activeBlock - 1);
    //   }
    // }
  };

  const onMove = (type: string) => {
    // let fullBlocks = [...blocks];
    // if (type == 'up') {
    //   if (activeBlock == 0) return;
    //   fullBlocks[activeBlock] = fullBlocks.splice(activeBlock - 1, 1, fullBlocks[activeBlock])[0];
    //   setActiveBlock(activeBlock - 1);
    // }
    // if (type == 'down') {
    //   if (activeBlock == fullBlocks.length - 1) return;
    //   fullBlocks[activeBlock] = fullBlocks.splice(activeBlock + 1, 1, fullBlocks[activeBlock])[0];
    //   setActiveBlock(activeBlock + 1);
    // }
    // updateData(fullBlocks);
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

  const outerTheme = createTheme({
    palette: {
      primary: grey,
    },
    components: {
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
    <ThemeProvider theme={outerTheme}>
      <div
        ref={currentRef}
        className={
          (viewmode == 'edit' ? '  ' : 'view ') +
          (settingsShown ? 'settings ' : '') +
          dmeditorEditCss
        }
      >
        <Toolbar readonlyMode={false} />

        <div className="dme-settings" style={{ display: settingsShown ? 'block' : 'none' }}>
          <div>{Util.renderPageTab()}</div>
        </div>

        <div
          style={settingsShown ? { display: 'none' } : {}}
          id="dmeditor-main"
          className="layout-main-container"
        >
          <div
            className={
              'layout-main ' + ' viewmode-' + viewmode + (viewmode === 'edit' ? '' : ' is-preview')
            }
          >
            {viewmode === 'edit' && (
              <div className={dmeditorViewCss}>
                <BlockListRender data={storage} selected={selectedBlockIndex} />
                {/* <div style={{ width: '100%', height: 1 }}></div> */}
                {/* {Array.isArray(storage) &&
                  storage.map((widget, index) => {
                    const currentSelected = selectedBlockIndex === index;
                    return (
                      <BlockRender
                        siblingDirection="vertical"
                        data={widget}
                        active={currentSelected}
                        newBlock={currentSelected && newBlock ? true : false}
                        onCancel={onDelete}
                        key={widget.id}
                        onActivate={() => handleWidgetIndexChange(index)}
                        onChange={(data) => {
                          //use updated ref to avoid old data
                          // let newBlocks = [...blocksRef.current];
                          // data = sanitizeBlockData(data);
                          // newBlocks[index] = data;
                          // updateData(newBlocks);
                          // setNewBlock(false);
                        }}
                        onAddAbove={(type: string, template?: string) =>
                          addAbove(type, index, template)
                        }
                        onAddUnder={(type: string, template?: string) =>
                          addUnder(type, index, template)
                        }
                      />
                    );
                  })} */}
              </div>
            )}
            {viewmode !== 'edit' && (
              <DMEditorView
                key={viewmode}
                data={storage}
                getFileUrl={props.getFileUrl}
                getImageUrl={props.getImageUrl}
              />
            )}
          </div>
        </div>
        {viewmode == 'edit' && (
          <div style={settingsShown ? { display: 'none' } : {}} className="layout-properties">
            <div id="dmeditor-add-menu">
              {storage?.length === 0 && (
                <MenuList
                  onSelect={(type: string, template?: string) => {
                    addUnder(type, -1, template);
                  }}
                />
              )}
            </div>
           <SettingPanel />
            <div style={{ marginBottom: '100px' }}>
              <div id="dmeditor-property">
                <div className="property-tab-container"></div>
                <div></div>
              </div>
              {viewmode === 'edit' && (
                <div
                  style={{
                    position: 'fixed',
                    bottom: 0,
                    height: '100px',
                    width: '262px',
                    padding: '10px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div style={{ marginBottom: '15px' }}>
                    <a
                      href="/"
                      title="Move up"
                      onClick={(e) => {
                        e.preventDefault();
                        onMove('up');
                      }}
                    >
                      <ArrowUpwardOutlined />{' '}
                    </a>
                    <a
                      href="/"
                      title="Move down"
                      onClick={(e) => {
                        e.preventDefault();
                        onMove('down');
                      }}
                    >
                      <ArrowDownwardOutlined />
                    </a>
                  </div>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    title="Delete"
                    onClick={onDelete}
                  >
                    <DeleteOutline />
                    Delete block
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
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
