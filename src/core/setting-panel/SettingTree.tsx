import { useEffect, useMemo, useState } from 'react';
import { ArrowDropDownOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';

import { dmeConfig, useEditorStore } from '../..';
import { DME, DMEData } from '../types';
import {
  arrayStarts,
  getPropertyValue,
  getWidget,
  getWidgetStyle,
  getWidgetStyleOption,
  getWidgetWithVariant,
  isKeyInObject,
  PropertyGroup,
  PropertyItem,
} from '../utils';
import { ListOverview } from './ListOverview';
import Property from './property-setting/property-item';
import { StyledSettingList, StyledSettingNoGroup } from './style';
import { StyleSettings } from './style-settings/StyleSettings';

//Show settings of a widget, recurisively when there is embed
export const SettingTree = (props: {
  rootWidget: string;
  blockData: DMEData.Block;
  blockPath: Array<number>;
  selectedPath: Array<number>;
  category?: string;
  level?: number;
}) => {
  const { blockData, selectedPath, level = 0, category, blockPath, rootWidget } = props;
  const { updateBlockStyleByPath, updateBlockPropsByPath } = useEditorStore();

  const [settingStatus, setSettingStatus] = useState<{
    [index: string | symbol]: DME.WidgetStyleSettingStatus;
  }>({});

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
    }
  }, [blockData.id]);

  const getEmbedConfigObject = () => {
    const [def] = getWidgetWithVariant(rootWidget);
    if (def?.events.embedConfig) {
      return def.events.embedConfig;
    }
    return null;
  };

  //get Widget setting with variant
  const settingConfigList = useMemo(() => {
    const [widgetDef, variant] = getWidgetWithVariant(blockData.type);
    let result: Array<DME.Setting> = [];
    if (widgetDef) {
      if (variant && variant.enabledSettings) {
        result = widgetDef.settings.filter((item: DME.Setting) => {
          return (
            item.property &&
            variant.enabledSettings?.includes(item.property) &&
            item.category === category
          );
        });
      } else {
        let settings = widgetDef?.settings;

        //filter from system
        result = settings.filter((item) => {
          if (item.category === category) {
            if (item.category !== 'block') {
              return true;
            } else {
              if (item.styleTags) {
                //if not in root
                if (blockPath.length > 1 && item.styleTags.includes('root')) {
                  return false;
                }
              }
              return true;
            }
          } else {
            return false;
          }
        });

        //filter from mixed-widget root
        if (blockData.isEmbed) {
          const configObject = getEmbedConfigObject();
          if (configObject?.enabledSettings) {
            result = configObject.enabledSettings(result, {
              relativePath: blockPath.slice(blockPath.length - level),
              blockData: blockData,
            });
          }
        }
      }
      return result;
    }
  }, [blockData.id, category]);

  const settingGroups = useMemo(() => {
    const groups: Array<string | undefined> = [];
    if (settingConfigList) {
      settingConfigList.map((item) => {
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

  const resetSettingStatus = (styleOption: string, style: string) => {
    let statusObj = { ...settingStatus };

    //when it's set to none
    if (styleOption === '') {
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
      if (style === '_') {
        statusObj = {};
      }
      const optionDef = getWidgetStyleOption(blockData.type, styleOption, style);
      if (!optionDef) {
        return;
      }
      if (!optionDef.settings) {
        return;
      }
      for (const key of Object.keys(optionDef.settings)) {
        const setting = optionDef.settings[key];
        if (setting.status) {
          statusObj[key] = setting.status;
        }
      }
    }
    setSettingStatus(statusObj);
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
        const settingComponent = setting.settingComponent;
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

        return settingComponent && settingStatus[property] !== 'hidden' ? (
          <PropertyItem label={setting.name} key={setting.property}>
            <Property {...propertyProps} />
          </PropertyItem>
        ) : null;
      }
    });
  };

  const renderCurrentSettings = () => {
    return (
      <div>
        {category === 'block' && (
          <StyleSettings
            values={blockData?.style || {}}
            blockType={blockData.type}
            onChange={switchStyleOption}
            // onChange={(v, style) => {
            // updateBlockStyleByPath(v, style, blockPath);
            // }}
          />
        )}
        {settingGroups.map((group) => (
          <div>
            {group && (
              <PropertyGroup header={dmeConfig.editor.settingGroups[group]}>
                <div>
                  {renderSettingList(settingConfigList?.filter((item) => item.group === group))}
                </div>
              </PropertyGroup>
            )}

            {!group && (
              <StyledSettingNoGroup>
                {renderSettingList(settingConfigList?.filter((item) => item.group === group))}
              </StyledSettingNoGroup>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderChildrenSettings = () => {
    return (
      <div>
        {blockData.children?.map((item, index) => {
          const newPath = [...blockPath, index];
          return (
            <div>
              <SettingTree
                rootWidget={rootWidget}
                blockData={item}
                category={category}
                blockPath={newPath}
                selectedPath={selectedPath}
                level={level + 1}
              />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    setExpanded(isSelected);
  }, [isSelected]);

  return (
    <div>
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
        </div>
      )}
      <Collapse in={level === 0 || expanded}>
        <StyledSettingList.Group level={level}>{renderCurrentSettings()}</StyledSettingList.Group>
        {widgetDef?.widgetType && ['list', 'mixed'].includes(widgetDef.widgetType) && (
          <div>
            {(() => {
              if (widgetDef.widgetType === 'list') {
                if (blockData.isEmbed) {
                  return (
                    <StyledSettingList.Children level={level}>
                      {renderChildrenSettings()}
                    </StyledSettingList.Children>
                  );
                } else {
                  return (
                    <StyledSettingList.Children level={level}>
                      {blockData.children ? (
                        <ListOverview
                          data={blockData.children}
                          blockPath={blockPath}
                          selectedIndex={-1}
                        />
                      ) : (
                        <></>
                      )}
                    </StyledSettingList.Children>
                  );
                }
              } else {
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
