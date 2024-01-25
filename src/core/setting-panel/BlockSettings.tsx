import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DeleteOutline,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@mui/icons-material';
import { Divider } from '@mui/material';

import { PropertyTab, TabData } from '../components/property-tab/Tab';
import { useEditorStore } from '../main/store';
import { defaultSettingTabs } from './config';
import Property from './property-setting/property-item';
import { Bottom, RightElement, Space, TabBodyContainer } from './style';
import { getWidget, properties } from 'Components/widgets';
import {
  getValueByPath,
  PickColor,
  PropertyButton,
  PropertyGroup,
  PropertyItem,
  Ranger,
} from 'Core/utils';

interface CommonSettingsType {
  align: string;
  backgroundColor: string;
  color: string;
  marginTop: number;
  height: number;
  padding: number;
  width: number;

  selectedBlockIndex: number;
}

export const BlockSettings = (props: {
  commonSettings: any;
  settingList?: Array<string>;
  onDelete?: () => void;
  onChange: (data: any) => void;
  commonChange: (type: keyof CommonSettingsType, data: any) => void;

  selectedBlockIndex: number;
}) => {
  const { selectedBlockIndex, onChange = () => {}, commonChange = () => {} } = props;
  const [blockOpen, setBlockOpen] = useState(true);
  const { getSelectedBlock } = useEditorStore();

  const selectedBlock = useMemo(
    () => getSelectedBlock(props.selectedBlockIndex),
    [props.selectedBlockIndex],
  );

  const selectedWidget = useMemo(() => getWidget(selectedBlock?.type || ''), [selectedBlock?.type]);

  const hasProperty = (propName: string, compName: string) => {
    if (!compName) return false;
    // the same as: return compName.indexOf(propName) !== -1;
    // or return the last index of comp
    // return hasConfig(compName, propName);
  };

  const containSetting = (propName: string, compName: string) => {
    let originalWidget = null;
    if (!compName) return false;
    if (!selectedWidget) return false;

    const { category, type } = { ...selectedWidget, category: 'widget' }; //todo: remove merge
    if (category === 'layout') {
      // originalWidget = getLayoutByType(type);
    } else if (category === 'widget') {
      originalWidget = getWidget(type)?.settings;
    } else {
      console.error(`Unknown category: ${category}`);
    }
    if (!originalWidget) return false;
    return Object.keys(originalWidget).includes(propName);
  };

  // const Comp = useMemo(() => {
  //   return WidgetProperties[selectedWidget.type];
  // }, [selectedWidgetIndex]);

  const getFilteredSettings = (identifier: string) => {
    return selectedWidget?.settings.filter((item) => item.category === identifier);
  };

  const getTabData = () => {
    const tabs: Array<TabData> = [];
    Object.keys(defaultSettingTabs).map((identifier) => {
      const filteredSettings = getFilteredSettings(identifier);
      if (filteredSettings && filteredSettings?.length > 0) {
        tabs.push({ title: defaultSettingTabs[identifier], element: renderATab(identifier) });
      }
    });
    return tabs;
  };

  const renderATab = (identifier: string): ReactElement => {
    const filteredSettings = getFilteredSettings(identifier);
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
            return <Property key={selectedBlockIndex} {...setting} />;
          } else {
            const settingType = setting.settingType;
            const value = getValueByPath(setting.property, selectedBlock?.data);
            return settingType ? (
              <PropertyItem label={setting.name} key={setting.property}>
                <Property {...{ ...setting, value: value }} />
              </PropertyItem>
            ) : (
              <></>
            );
          }
        })}
        {/* </PropertyGroup> */}
      </TabBodyContainer>
    );
  };

  return (
    <div>
      <PropertyTab tabs={getTabData()}></PropertyTab>
      <Bottom>
        <Divider />
        <RightElement>
          <PropertyButton color="warning" title="Delete">
            <DeleteOutline />
          </PropertyButton>
        </RightElement>
      </Bottom>
    </div>
  );
};
