import { useMemo } from 'react';

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

//Show settings of a widget, recurisively when there is embed
export const SettingList = (props: {
  blockData: DMEData.Block;
  category?: string;
  level?: number;
}) => {
  const { blockData, level = 0, category } = props;

  const widgetDef = useMemo(() => {
    const def = getWidget(blockData.type);
    return def;
  }, [blockData.type]);

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
            return <Property {...{ ...setting, block: blockData }} />;
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
                <Property {...{ ...setting, block: blockData, value: value }} />
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
        {blockData.children?.map((item) => (
          <div>
            <SettingList blockData={item} category={category} level={level + 1} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {level > 0 && (
        <div style={{ fontSize: 18 }}>
          <label>{widgetDef.name}</label>
        </div>
      )}
      <div style={{ padding: 5 }}>{renderCurrentSettings()}</div>
      <div style={{ padding: 5 }}>
        {(() => {
          if (widgetDef.widgetType === 'list') {
            if (blockData.isEmbed) {
              return <div>{renderChildrenSettings()}</div>;
            } else {
              return (
                <div>
                  {blockData.children ? (
                    <ListOverview data={blockData.children} selectedIndex={0} />
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
          } else {
            return <div>{renderChildrenSettings()}</div>;
          }
        })()}
      </div>
    </div>
  );
};
