import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/css';
import {
  ArrowDropDownOutlined,
  ArrowRightAltOutlined,
  ArrowRightOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import { useWidgetSettingStore } from 'dmeditor/core/main/store';

import {
  ContextWithStyleType,
  dmeConfig,
  generalSettings,
  getContextInMixed,
  getStyleConfig,
  i18n,
  iteratePath,
  useEditorStore,
} from '../../..';
import { DME, DMEData } from '../../types';
import {
  arrayStarts,
  convertStyleDataToArray,
  getEmbedConfigObject,
  getPropertyValue,
  getValidStyles,
  getWidget,
  getWidgetName,
  getWidgetStyle,
  getWidgetStyleOption,
  getWidgetWithVariant,
  isKeyInObject,
  mapBlockList,
  PropertyGroup,
  PropertyItem,
} from '../../utils';
import { ListOverview } from '../ListOverview';
import Property from '../property-setting/property-item';
import { StyleSettings } from '../style-settings/StyleSettings';
import { isEmbedOwnSetting } from './embedSetting';
import { StyledSettingList, StyledSettingNoGroup } from './styled';

//Show settings of a widget, recurisively when there is embed
export const SettingTree = (props: {
  rootWidget: string;
  blockData: DMEData.Block;
  blockPath: Array<number | string>;
  selectedPath: Array<number>;
  category?: string;
  level?: number;
  options: { mobileOnly?: boolean };
  canDelete?: boolean;
}) => {
  const { blockData, selectedPath, level = 0, category, blockPath, rootWidget } = props;
  const {
    updateBlockStyleByPath,
    updateBlockPropsByPath,
    updateSelectedBlockIndex,
    removeByPath,
    storage,
  } = useEditorStore();

  const [settingStatus, setSettingStatus] = useState<{
    [index: string | symbol]: DME.WidgetStyleSettingStatus;
  }>({});

  const [enabledStyleSettings, setEnableStyleSettings] = useState<undefined | Array<string>>(
    undefined,
  );

  //if selected path contains block path, it's selected (meaning parents are also selected)
  const isSelected = level > 0 && arrayStarts(selectedPath, blockPath);

  const widgetDef = useMemo(() => {
    const def = getWidget(blockData.type);
    return def;
  }, [blockData.type]);

  const [expanded, setExpanded] = useState(isSelected);

  //init setting status
  useEffect(() => {
    const styles = blockData.style;
    if (styles) {
      for (const style of Object.keys(styles)) {
        const option = styles[style];
        resetSettingStatus(option, style);
      }
    } else {
      setSettingStatus({});
    }
  }, [blockData.id]);

  const validStyles = useMemo(() => {
    return getValidStyles(blockData.type);
  }, [blockData.id]);

  //get Widget settings & styles
  const settingConfigs = useMemo(() => {
    const blockType = blockData.type;
    const [widgetDef, variant] = getWidgetWithVariant(blockType);
    let settingList: Array<DME.Setting> = [];
    let result: {
      enabledStyles?: { [styleKey: string]: Array<string> };
      settings: Array<DME.Setting>;
    } = {
      settings: [],
    };
    if (widgetDef) {
      if (variant && variant.enabledSettings) {
        settingList = widgetDef.settings.filter((item: DME.Setting) => {
          return (
            item.property &&
            variant.enabledSettings?.includes(item.property) &&
            item.category === category
          );
        });
      } else {
        let settingList = widgetDef?.settings.filter((item) => item.category === category);

        let enabledStyles: Record<string, Array<string>> | undefined;

        if (category === 'style') {
          const { root: mixedRoot, path: pathParams } = getContextInMixed(blockPath, storage);

          const callbackGetStyleSettings = dmeConfig.editor.configStyleSettings;
          if (callbackGetStyleSettings && pathParams.length > 0) {
            const current = pathParams[pathParams.length - 1];
            let parentIsList = false;
            if (pathParams.length >= 2) {
              const parent = pathParams[pathParams.length - 2];
              if (
                typeof parent.pathKey === 'number' ||
                (parent.block && getWidget(parent.block.type).widgetType === 'list')
              ) {
                parentIsList = true;
              }
            }

            const context: ContextWithStyleType = { path: pathParams };
            if (mixedRoot) {
              context['root'] = {
                type: mixedRoot.type,
                styles: convertStyleDataToArray(mixedRoot.style),
              };
            }
            const availableStyleSettings = getStyleConfig(current, context, parentIsList);
            if (availableStyleSettings) {
              const availableGeneralSettings = generalSettings.filter(
                (item) =>
                  item.category === 'style' &&
                  availableStyleSettings.settings.includes(item.identifier || ''),
              );

              if (availableStyleSettings.styles) {
                enabledStyles = availableStyleSettings.styles;
              }

              settingList = settingList.filter((item) => {
                if (
                  item.category === 'style' &&
                  (!availableStyleSettings.builtInSettings ||
                    !item.identifier ||
                    (availableStyleSettings.builtInSettings &&
                      item.identifier &&
                      availableStyleSettings.builtInSettings.includes(item.identifier)))
                ) {
                  return true;
                } else {
                  return false;
                }
              });
              settingList = [...settingList, ...availableGeneralSettings];
            }
          }
        }

        result = { settings: settingList, enabledStyles: enabledStyles };
      }
      return result;
    }
  }, [blockData.id, category, blockData.style]);

  const settingGroups = useMemo(() => {
    const groups: Array<string | undefined> = [];
    if (settingConfigs && settingConfigs.settings) {
      settingConfigs.settings.map((item) => {
        if (!groups.includes(item.group)) {
          groups.push(item.group);
        }
      });
    }
    return groups;
  }, [blockData.id]);

  //get all setting keys under this style, regarless of options
  const getStyleSettingKeys = (blockType: string, style: string) => {
    let settingKeys: Array<string> = [];
    for (const option of getWidgetStyle(blockData.type, style).options) {
      if (option.settings) {
        for (const key of Object.keys(option.settings)) {
          if (!settingKeys.includes(key)) {
            settingKeys.push(key);
          }
        }
      }
    }
    return settingKeys;
  };

  //set settting status between style selection and settings
  const resetSettingStatus = (styleOption: string, style: string) => {
    let statusObj = { ...settingStatus };
    // only support root style: "_"
    let enabledSettings: typeof enabledStyleSettings = undefined;

    //when it's set to none
    if (styleOption === '') {
      enabledSettings = undefined;
      if (style === '_') {
        statusObj = {};
      } else {
        const settingKeys = getStyleSettingKeys(blockData.type, style);
        for (const key of settingKeys) {
          if (isKeyInObject(key, statusObj)) {
            delete statusObj[key];
          }
        }
      }
    } else {
      //when it's set to value
      const optionDef = getWidgetStyleOption(blockData.type, styleOption, style);
      if (!optionDef) {
        return;
      }
      if (style === '_') {
        statusObj = {};
      }

      if (optionDef?.enabledStyleSettings) {
        enabledSettings = optionDef.enabledStyleSettings;
      }

      if (optionDef.settings) {
        for (const key of Object.keys(optionDef.settings)) {
          const setting = optionDef.settings[key];
          if (setting.status) {
            statusObj[key] = setting.status;
          }
        }
      }
    }
    setSettingStatus(statusObj);
    setEnableStyleSettings(enabledSettings);
  };

  const switchStyleOption = (styleOption: string, style: string) => {
    //update style
    updateBlockStyleByPath(styleOption, style, blockPath);
    resetSettingStatus(styleOption, style);

    //update style setting data to style setting value
    if (styleOption === '') {
      //when it's set to none
      const properties = getStyleSettingKeys(blockData.type, style);
      for (const property of properties) {
        updateBlockPropsByPath(blockPath, property, undefined);
      }
    } else {
      const optionDef = getWidgetStyleOption(blockData.type, styleOption, style);
      if (!optionDef) {
        return;
      }

      const styleSettings = optionDef.settings;
      if (styleSettings) {
        // setSelectedStyleSettings(styleSettings);
        for (const property of Object.keys(styleSettings)) {
          const value = styleSettings[property].value;
          updateBlockPropsByPath(blockPath, property, value);
        }
      }
    }
  };

  const renderSettingList = (list?: DME.Setting[]) => {
    if (!list) {
      return <></>;
    }
    return list.map((setting) => {
      if (setting.custom) {
        return <Property {...{ ...setting, block: blockData, blockPath: blockPath }} />;
      } else {
        // const settings = getPropertyFromSettings(blockData);
        const { property } = setting;
        if (!property) {
          return undefined;
        }
        const value = getPropertyValue(property, blockData);
        const propertyProps = {
          ...setting,
          block: blockData,
          value,
          blockPath,
          disabled: settingStatus[property] === 'disabled',
        };

        return (
          <PropertyItem
            upDown={propertyProps.display?.upDown}
            label={setting.name}
            autoWidth={setting.display?.labelFullWidth}
            description={setting.description}
            key={blockPath + (setting.property || '')}
          >
            <Property {...propertyProps} />
          </PropertyItem>
        );
      }
    });
  };

  const { setMainLoaded } = useWidgetSettingStore();

  useEffect(() => {
    setMainLoaded(true);
    return () => {
      setMainLoaded(false);
    };
  }, []);

  const renderCurrentSettings = () => {
    return (
      <div>
        {category === 'style' && (
          <StyleSettings
            values={blockData?.style || {}}
            enabledStyles={settingConfigs?.enabledStyles}
            blockType={blockData.type}
            onChange={switchStyleOption}
          />
        )}
        <div id="dme-widget-setting-container" />
        {settingGroups.map((group) => {
          let settingList = settingConfigs?.settings.filter((item) => item.group === group);
          let validSettingList = settingList?.filter((setting) => {
            if (!setting.settingComponent) {
              return false;
            }

            if (setting.category === 'style') {
              //if it's not enabled, ignore
              if (
                enabledStyleSettings &&
                setting.identifier &&
                !enabledStyleSettings.includes(setting.identifier)
              ) {
                return false;
              }

              if (
                props.options.mobileOnly &&
                (!setting.appliedDevices || !setting.appliedDevices.includes('mobile'))
              ) {
                return false;
              }

              if (setting.property && settingStatus[setting.property] === 'hidden') {
                return false;
              }
            }

            return true;
          });

          if (!validSettingList || validSettingList.length === 0) {
            return <></>;
          }

          return (
            <div>
              {group && (
                <PropertyGroup
                  expandable={true}
                  header={i18n(dmeConfig.editor.settingGroups[group], 'property-group')}
                >
                  <div>{renderSettingList(validSettingList)}</div>
                </PropertyGroup>
              )}

              {!group && (
                <StyledSettingNoGroup>{renderSettingList(validSettingList)}</StyledSettingNoGroup>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderChildrenSettings = () => {
    return (
      <div>
        {mapBlockList(blockData.children || [], (item, index) => {
          if (!item.type) {
            return <></>;
          }
          const newPath = [...blockPath, index];
          const isOwnView = isEmbedOwnSetting(
            item,
            newPath.slice(newPath.length - (level + 1)),
            rootWidget,
          );
          if (isOwnView) {
            if (category === 'style') {
              return <></>;
            }
            return (
              <div>
                <span>{getWidgetName(item.type)}</span>
                <Button onClick={() => updateSelectedBlockIndex(newPath, item.id || '')}>
                  <ArrowRightAltOutlined />
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <SettingTree
                  rootWidget={rootWidget}
                  blockData={item}
                  category={category}
                  blockPath={newPath}
                  options={props.options}
                  selectedPath={selectedPath}
                  level={level + 1}
                  canDelete={widgetDef.widgetType === 'list'}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  useEffect(() => {
    setExpanded(isSelected);
  }, [isSelected]);

  return (
    <div
      className={
        props.category === 'style'
          ? css`
              :not(:has(.dmee-setting-property)) {
                display: none;
              }
            `
          : ''
      }
    >
      {level > 0 && (
        <div>
          <Button
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ArrowDropDownOutlined /> : <ArrowRightOutlined />}
            <span>{widgetDef.name}</span>
          </Button>
          {props.canDelete && (
            <Button onClick={() => removeByPath(blockPath)}>
              <DeleteOutline fontSize="small" />
            </Button>
          )}
        </div>
      )}
      <Collapse in={level === 0 || expanded}>
        <StyledSettingList.Group level={level}>{renderCurrentSettings()}</StyledSettingList.Group>
        {widgetDef?.widgetType && ['list', 'mixed'].includes(widgetDef.widgetType) && (
          <div>
            {(() => {
              if (widgetDef.widgetType === 'list' && !blockData.isEmbed) {
                return (
                  <StyledSettingList.Children level={level}>
                    {blockData.children ? (
                      <ListOverview
                        data={Array.isArray(blockData.children) ? blockData.children : []}
                        blockPath={blockPath}
                        selectedIndex={-1}
                      />
                    ) : (
                      <></>
                    )}
                  </StyledSettingList.Children>
                );
              } else if ((level === 0 && !Array.isArray(blockData.children)) || level > 0) {
                return (
                  <StyledSettingList.Children level={level}>
                    {renderChildrenSettings()}
                  </StyledSettingList.Children>
                );
              }
            })()}
          </div>
        )}
      </Collapse>
    </div>
  );
};
