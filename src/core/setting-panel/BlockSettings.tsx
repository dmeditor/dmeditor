import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DeleteOutline,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@mui/icons-material';
import { Divider, MenuItem, Select } from '@mui/material';
import {
  getWidget,
  getWidgetName,
  getWidgetStyle,
  getWidgetVariant,
  getWidgetWithVariant,
  properties,
  widgetStyles,
} from 'dmeditor/components/widgets';
import {
  getPropertyChildren,
  getPropertyValue,
  getValueByPath,
  isNull,
  PickColor,
  PropertyButton,
  PropertyGroup,
  PropertyItem,
  Ranger,
} from 'dmeditor/utils';

import { PropertyTab, TabData } from '../components/property-tab/Tab';
import { useEditorStore } from '../main/store';
import { DMEData } from '../types';
import { DeleteBlock } from './actions/DeleteBlock';
import { defaultSettingTabs } from './config';
import Property from './property-setting/property-item';
import { ActionPanel, Bottom, RightElement, Space, TabBodyContainer } from './style';
import { StyleSettings } from './style-settings/StyleSettings';

interface CommonSettingsType {
  align: string;
  backgroundColor: string;
  color: string;
  marginTop: number;
  height: number;
  padding: number;
  width: number;

  blockIndex: number;
}

export const BlockSettings = (props: {
  commonSettings: any;
  settingList?: Array<string>;
  onDelete?: () => void;
  onChange: (data: any) => void;
  commonChange: (type: keyof CommonSettingsType, data: any) => void;

  dataPath: Array<number>;
}) => {
  const { dataPath } = props;

  // const [blockData, setBlockData] = useState<DMEData.Block>();

  const { getBlockByPath, getSelectedBlock, updateSelectedBlockStyle } = useEditorStore();

  const blockData = getBlockByPath(dataPath);
  // const blockData = getSelectedBlock();

  const blockType = blockData?.type || '';

  //get Widget setting with variant
  const getWidgetSettings = (widget: string) => {
    const [widgetDef, variant] = getWidgetWithVariant(widget);
    if (widgetDef) {
      if (variant && variant.enabledSettings) {
        const filteredSettings = widgetDef.settings.filter((item) => {
          return variant.enabledSettings?.includes(item.property);
        });
        return filteredSettings;
      }
      return widgetDef?.settings;
    }
  };

  const selectedWidgetSetings = useMemo(
    () => getWidgetSettings(blockData?.type || ''),
    [blockData?.type],
  );

  const hasProperty = (propName: string, compName: string) => {
    if (!compName) return false;
    // the same as: return compName.indexOf(propName) !== -1;
    // or return the last index of comp
    // return hasConfig(compName, propName);
  };

  // const containSetting = (propName: string, compName: string) => {
  //   let originalWidget = null;
  //   if (!compName) return false;
  //   if (!selectedWidget) return false;

  //   const { category, type } = { ...selectedWidget, category: 'widget' }; //todo: remove merge
  //   if (category === 'layout') {
  //     // originalWidget = getLayoutByType(type);
  //   } else if (category === 'widget') {
  //     originalWidget = getWidget(type)?.settings;
  //   } else {
  //     console.error(`Unknown category: ${category}`);
  //   }
  //   if (!originalWidget) return false;
  //   return Object.keys(originalWidget).includes(propName);
  // };

  // const Comp = useMemo(() => {
  //   return WidgetProperties[selectedWidget.type];
  // }, [selectedWidgetIndex]);

  const getFilteredSettings = (category: string) => {
    return selectedWidgetSetings?.filter((item) =>
      item.category ? item.category === category : category === 'widget',
    );
  };

  const settingCategory = useMemo(() => {
    const result = defaultSettingTabs;
    result['widget'] = getWidgetName(blockType);
    return result;
  }, [blockType]);

  const getTabData = () => {
    const tabs: Array<TabData> = [];
    Object.keys(settingCategory).map((identifier) => {
      const filteredSettings = getFilteredSettings(identifier);
      if ((filteredSettings && filteredSettings?.length > 0) || identifier === 'widget') {
        tabs.push({ title: settingCategory[identifier], element: renderATab(identifier) });
      }
    });
    return tabs;
  };

  const renderATab = (category: string): ReactElement => {
    const filteredSettings = getFilteredSettings(category);
    return (
      <TabBodyContainer>
        {/* <PropertyGroup
          header="Block settings"
          expandable={true}
          open={blockOpen}
          onOpenClose={(open) => setBlockOpen(open)}
        > */}
        {filteredSettings?.map((setting) => {
          if (setting.custom) {
            return <Property {...setting} />;
          } else {
            const settingComponent = setting.settingComponent;
            // const value = getValueByPath(setting.property, selectedBlock?.data);
            const value = isNull(blockData.data)
              ? getPropertyChildren(setting.property, blockData.children)
              : getPropertyValue(setting.property, blockData.data);
            return settingComponent ? (
              <PropertyItem label={setting.name} key={setting.property}>
                <Property {...{ ...setting, value: value }} />
              </PropertyItem>
            ) : null;
          }
        })}
        {/* </PropertyGroup> */}

        {category == 'widget' && (
          <>
            <StyleSettings
              values={blockData?.style || {}}
              blockType={blockType}
              onChange={(v, style) => {
                updateSelectedBlockStyle(v, style);
              }}
            />
            <ActionPanel>
              <DeleteBlock />
            </ActionPanel>
          </>
        )}
      </TabBodyContainer>
    );
  };

  return <div>{blockData && <PropertyTab tabs={getTabData()}></PropertyTab>}</div>;
};
