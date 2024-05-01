import { ReactElement, useMemo } from 'react';

import { getWidgetName, getWidgetWithVariant } from '../../core/utils';
import { PropertyTab, TabData } from '../components/property-tab/Tab';
import { dmeConfig } from '../config';
import { useEditorStore } from '../main/store';
import { getPropertyChildren, getPropertyValue, isNull, PropertyItem } from '../utils';
import { canEditControl, editControlEnabled } from '../utils/editControl';
import { CopyPaste, DeleteBlock, Move } from './actions';
import { SetEditControl } from './actions/SetEditControl';
import { defaultSettingTabs } from './config';
import Property from './property-setting/property-item';
import { ActionPanel, ActionPanelButtonGroup, RightElement, TabBodyContainer } from './style';
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
            return <Property {...{ ...setting, block: blockData }} />;
          } else {
            const settingComponent = setting.settingComponent;
            // const value = getValueByPath(setting.property, selectedBlock?.data);
            const value = isNull(blockData.data)
              ? getPropertyChildren(setting.property, blockData.children)
              : getPropertyValue(setting.property, blockData.data);
            return settingComponent ? (
              <PropertyItem label={setting.name} key={setting.property}>
                <Property {...{ ...setting, block: blockData, value: value }} />
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
              <ActionPanelButtonGroup>
                <Move />
                <CopyPaste />
              </ActionPanelButtonGroup>
              {!(
                editControlEnabled() &&
                canEditControl(blockData) === false &&
                blockData.editControl === 2
              ) && (
                <ActionPanelButtonGroup>
                  <RightElement>
                    <DeleteBlock />
                  </RightElement>
                </ActionPanelButtonGroup>
              )}
              {editControlEnabled() && canEditControl(blockData) && (
                <SetEditControl blockData={blockData} />
              )}
            </ActionPanel>
          </>
        )}
      </TabBodyContainer>
    );
  };

  return <div>{blockData && <PropertyTab tabs={getTabData()}></PropertyTab>}</div>;
};
