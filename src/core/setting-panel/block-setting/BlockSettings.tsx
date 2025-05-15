import { ReactElement, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { FormControlLabel, Switch } from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { useDevice } from 'dmeditor/core/hooks/useDeivce';

import { PropertyTab, TabData } from '../../components/property-tab/Tab';
import { DMEData } from '../../types';
import { getWidgetName } from '../../utils';
import { canEditControl, editControlEnabled } from '../../utils/editControl';
import { CopyPaste, DeleteBlock, Move } from '../actions';
import { SetEditControl } from '../actions/SetEditControl';
import { defaultSettingTabs } from '../config';
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

  const currentDevice = useDevice();

  const [mobileSettingOnly, setMobileSettingOnly] = useState(
    currentDevice === 'mobile' ? true : false,
  );

  useEffect(() => {
    setMobileSettingOnly(currentDevice === 'mobile');
  }, [currentDevice]);

  const blockInList = useMemo(() => {
    if (blockPath.length === 0) {
      return false;
    } else {
      const lastOne = blockPath[blockPath.length - 1];
      if (typeof lastOne === 'number') {
        return true;
      } else {
        return false;
      }
    }
  }, [blockPath]);

  const renderATab = (category: string): ReactElement => {
    return (
      <TabBodyContainer fullHeight={false}>
        <SettingTree
          blockData={blockData}
          blockPath={blockPath}
          selectedPath={selectedPath}
          options={{ mobileOnly: mobileSettingOnly }}
          category={category === 'widget' ? undefined : 'style'}
          level={embedLevel === undefined ? 0 : embedLevel}
          rootWidget={rootWidget}
        />

        {category == 'widget' && (
          <>
            {editControlEnabled() && canEditControl(blockData) && (
              <SetEditControl key={blockData.id} blockData={blockData} />
            )}
            {blockInList && (
              <ActionPanel>
                <ActionPanelButtonGroup>
                  <Move blockPath={blockPath} />
                  <CopyPaste />
                  {dmeConfig.plugins.blockSettingActions?.map((Item) => (
                    <Item blockData={blockData} />
                  ))}
                </ActionPanelButtonGroup>
                {!(
                  editControlEnabled() &&
                  canEditControl(blockData) === false &&
                  blockData.editControl === 2
                ) && (
                  <ActionPanelButtonGroup>
                    <RightElement>
                      <DeleteBlock blockPath={selectedPath} block={blockData} />
                    </RightElement>
                  </ActionPanelButtonGroup>
                )}
              </ActionPanel>
            )}
          </>
        )}
        {category == 'style' && (
          <ActionPanel>
            <FormControlLabel
              control={
                <Switch
                  checked={mobileSettingOnly}
                  onChange={(e) => {
                    setMobileSettingOnly(e.target.checked);
                  }}
                />
              }
              labelPlacement="start"
              label={'Mobile settings'}
            />
          </ActionPanel>
        )}
      </TabBodyContainer>
    );
  };

  const tabData = getTabData();

  return <div>{blockData && <PropertyTab tabs={tabData}></PropertyTab>}</div>;
};
