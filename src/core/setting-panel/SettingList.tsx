import path from 'path';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownwardOutlined,
  ArrowDropDownOutlined,
  ArrowRight,
  ArrowRightOutlined,
} from '@mui/icons-material';
import { Button, Collapse, IconButton } from '@mui/material';

import { dmeConfig, useEditorStore } from '../../';
import { DME, DMEData } from '../types';
import {
  getPropertyChildren,
  getPropertyValue,
  getWidget,
  getWidgetStyle,
  getWidgetStyles,
  getWidgetWithVariant,
  isNull,
  PropertyGroup,
  PropertyItem,
} from '../utils';
import { ListOverview } from './ListOverview';
import Property from './property-setting/property-item';
import { StyledSettingList, StyledSettingNoGroup } from './style';
import { StyleSettings } from './style-settings/StyleSettings';

//Show settings of a widget, recurisively when there is embed
export const SettingList = (props: {
  blockData: DMEData.Block;
  blockPath: Array<number>;
  category?: string;
  styleTags: Array<string>;
  level?: number;
}) => {
  const { blockData: originData, level = 0, category, blockPath, styleTags } = props;
  const { getClosestBlock, updateBlockStyleByPath, getSelectedBlock, selected } = useEditorStore();
  const isSelected = getSelectedBlock()?.id === originData.id;
  const isRoot = level === 0;
  const isOriginRootEmbed = originData.isEmbed && isRoot;

  const blockData = isOriginRootEmbed
    ? getClosestBlock(blockPath, (parent) => !parent.isEmbed)?.[0] ?? originData
    : originData;

  const widgetDef = useMemo(() => {
    const def = getWidget(blockData.type);
    return def;
  }, [blockData.type]);

  const [expanded, setExpanded] = useState(isSelected);

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
        result = widgetDef?.settings.filter((item) => {
          if (item.category === category) {
            if (item.category !== 'block') {
              return true;
            } else {
              if (!item.styleTags) {
                return true;
              } else {
                //if
                let matchResult = false;
                for (const tag of styleTags) {
                  if (item.styleTags.includes(tag)) {
                    matchResult = true;
                    break;
                  }
                }
                return matchResult;
              }
            }
          } else {
            return false;
          }
        });
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

  const renderSettingList = (list?: DME.Setting[]) => {
    if (!list) {
      return <></>;
    }
    return list.map((setting) => {
      console.log(setting);
      if (setting.custom) {
        return <Property {...{ ...setting, block: blockData, blockPath: blockPath }} />;
      } else {
        const settingComponent = setting.settingComponent;

        const { type } = blockData;
        // const styles = Object.keys(getWidgetStyles(type) || {});
        const styleObj = getWidgetStyle(type);

        if (blockData?.style) {
          const { style } = blockData;
          if (styleObj.identifier in style) {
            const cssStyleObj = styleObj.options.find(
              (option) => option.identifier === style[styleObj.identifier],
            );
            if (!cssStyleObj?.cssStyle) {
              console.warn(`Css style is not initial!`);
              return;
            }
            // css Style is: "\n       padding: 50px;\n       background: #efefef\n    "
            const { cssStyle } = cssStyleObj;

            // setting.property is property: 'settings.general.padding'
            if (setting?.property) {
              const attribute = setting.property.split('.').pop();
            }
          }
        }
        //todo: use better way to filter children
        const value = setting.property
          ? isNull(blockData.data)
            ? getPropertyChildren(setting.property, blockData.children)
            : getPropertyValue(setting.property, blockData.data)
          : undefined;
        return settingComponent ? (
          <PropertyItem label={setting.name} key={setting.property}>
            <Property {...{ ...setting, block: blockData, value: value, blockPath: blockPath }} />
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
            onChange={(v, style) => {
              updateBlockStyleByPath(v, style, blockPath);
            }}
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

  const renderChildrenSettings = (styleTags: Array<string>) => {
    return (
      <div>
        {blockData.children?.map((item, index) => (
          <div>
            <SettingList
              styleTags={styleTags}
              blockData={item}
              category={category}
              blockPath={[...blockPath, index]}
              level={level + 1}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (selected.blockId === originData.id) {
      setExpanded(true);
    }
  }, [selected]);

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
                      {renderChildrenSettings(['core', 'list'])}
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
                    {renderChildrenSettings(['core'])}
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
