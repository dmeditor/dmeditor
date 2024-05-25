import { useMemo, useState } from 'react';
import {
  ArrowDownwardOutlined,
  ArrowDropDownOutlined,
  ArrowRight,
  ArrowRightOutlined,
} from '@mui/icons-material';
import { Button, Collapse, IconButton } from '@mui/material';

import { DME, DMEData } from '../types';
import {
  getPropertyChildren,
  getPropertyValue,
  getWidget,
  getWidgetWithVariant,
  isNull,
  PropertyItem,
} from '../utils';
import { ListOverview } from './ListOverview';
import Property from './property-setting/property-item';
import { StyledSettingList } from './style';

//Show settings of a widget, recurisively when there is embed
export const SettingList = (props: {
  blockData: DMEData.Block;
  blockPath: Array<number>;
  category?: string;
  level?: number;
}) => {
  const { blockData, level = 0, category, blockPath } = props;

  const widgetDef = useMemo(() => {
    const def = getWidget(blockData.type);
    return def;
  }, [blockData.type]);

  const [expanded, setExpanded] = useState(level === 0);

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
        result = widgetDef?.settings.filter((item) => item.category === category);
      }
      return result;
    }
  }, [blockData.id, category]);

  const renderCurrentSettings = () => {
    return (
      <div>
        {settingConfigList?.map((setting) => {
          if (setting.custom) {
            return <Property {...{ ...setting, block: blockData, blockPath: blockPath }} />;
          } else {
            const settingComponent = setting.settingComponent;

            //todo: use better way to filter children
            const value = setting.property
              ? isNull(blockData.data)
                ? getPropertyChildren(setting.property, blockData.children)
                : getPropertyValue(setting.property, blockData.data)
              : undefined;
            return settingComponent ? (
              <PropertyItem label={setting.name} key={setting.property}>
                <Property
                  {...{ ...setting, block: blockData, value: value, blockPath: blockPath }}
                />
              </PropertyItem>
            ) : null;
          }
        })}
      </div>
    );
  };

  const renderChildrenSettings = () => {
    return (
      <div>
        {blockData.children?.map((item, index) => (
          <div>
            <SettingList
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
      <Collapse in={expanded}>
        <StyledSettingList.Group level={level}>{renderCurrentSettings()}</StyledSettingList.Group>
        {['list', 'mixed'].includes(widgetDef.widgetType) && (
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
