import { ReactElement, useMemo } from 'react';

import { PropertyTab, TabData } from '../../components/property-tab/Tab';
import { dmeConfig } from '../../config';
import { useEditorStore } from '../../main/store';
import { DMEData } from '../../types';
import {
  getPropertyChildren,
  getPropertyValue,
  getWidgetName,
  getWidgetWithVariant,
  isNull,
  PropertyItem,
  widgetDefinition,
} from '../../utils';
import { canEditControl, editControlEnabled } from '../../utils/editControl';
import { CopyPaste, DeleteBlock, Move } from '../actions';
import { SetEditControl } from '../actions/SetEditControl';
import { defaultSettingTabs } from '../config';
import Property from '../property-setting/property-item';
import { RightElement } from '../style';
import { SettingTree } from './SettingTree';
import { ActionPanel, ActionPanelButtonGroup, TabBodyContainer } from './styled';

export const BlockSettings = (props: {
  selectedPath: Array<number>;
  rootPath: Array<number>;
  rootBlock: DMEData.Block;
}) => {
  const { selectedPath, rootPath, rootBlock } = props;

  const { getBlockByPath } = useEditorStore();

  //todo: cache it, using useMemo?
  const blockData = getBlockByPath(selectedPath);

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
    result['widget'] = getWidgetName(rootBlock?.type || '');
    return result;
  }, [blockType]);

  const getTabData = () => {
    const tabs: Array<TabData> = [];
    Object.keys(settingCategory).map((identifier) => {
      tabs.push({ title: settingCategory[identifier], element: renderATab(identifier) });
    });
    return tabs;
  };

  const renderATab = (category: string): ReactElement => {
    const filteredSettings = getFilteredSettings(category);
    return (
      <TabBodyContainer fullHeight={category === 'block'}>
        {/* <PropertyGroup
          header="Block settings"
          expandable={true}
          open={blockOpen}
          onOpenClose={(open) => setBlockOpen(open)}
        > */}
        <SettingTree
          blockData={rootBlock}
          blockPath={rootPath}
          selectedPath={selectedPath}
          category={category === 'widget' ? undefined : 'block'}
          rootWidget={rootBlock.type}
        />

        {category == 'widget' && (
          <>
            {editControlEnabled() && canEditControl(blockData) && (
              <SetEditControl key={blockData.id} blockData={blockData} />
            )}
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
            </ActionPanel>
          </>
        )}
      </TabBodyContainer>
    );
  };

  const tabData = getTabData();

  return <div>{blockData && <PropertyTab tabs={tabData}></PropertyTab>}</div>;
};
