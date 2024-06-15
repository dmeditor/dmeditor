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
  blockPath: Array<number>;
  blockData: DMEData.Block;
  rootWidget: string;
  embedLevel?: number;
}) => {
  const { selectedPath, blockPath, blockData, rootWidget, embedLevel } = props;

  const blockType = blockData?.type || '';

  const settingCategory = useMemo(() => {
    const result = defaultSettingTabs;
    result['widget'] = getWidgetName(blockData.type || '');
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
    return (
      <TabBodyContainer fullHeight={category === 'block'}>
        <SettingTree
          blockData={blockData}
          blockPath={blockPath}
          selectedPath={selectedPath}
          category={category === 'widget' ? undefined : 'block'}
          level={embedLevel === undefined ? 0 : embedLevel}
          rootWidget={rootWidget}
        />

        {category == 'widget' && (
          <>
            {editControlEnabled() && canEditControl(blockData) && (
              <SetEditControl key={blockData.id} blockData={blockData} />
            )}
            <ActionPanel>
              <ActionPanelButtonGroup>
                <Move blockPath={blockPath} />
                <CopyPaste />
              </ActionPanelButtonGroup>
              {!(
                editControlEnabled() &&
                canEditControl(blockData) === false &&
                blockData.editControl === 2
              ) && (
                <ActionPanelButtonGroup>
                  <RightElement>
                    <DeleteBlock blockPath={selectedPath} />
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
