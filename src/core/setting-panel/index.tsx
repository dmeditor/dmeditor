import * as React from 'react';
import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Settings } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidget, getWidgetName } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { AddBlock } from './AddBlock';
import { BlockSettings } from './BlockSettings';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import { PageTitle, RightElement, SettingHeader, Space } from './style';

const { useEffect } = React;

type SettingPanelMode = 'block-setting' | 'list-overview' | 'page-setting' | 'adding';

// const SettingPanel = ({ selectedWidget }: { selectedWidget: string }) => {
const SettingPanel = (props) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData: { index: addBlockIndex, position: addBlockPosition },
    getSelectedBlock,
    getCurrentList,
    getParents,
    isSelected,
  } = useEditorStore((state) => state);

  const [mode, setMode] = useState<SettingPanelMode>('list-overview');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);

  const currentList = getCurrentList();
  // const selectedBlock = useMemo(() => getSelectedBlock(), [selectedBlockIndex]);
  const selectedBlock = getSelectedBlock();

  const updatePath = () => {
    const pathArray: Array<PathItem> = [{ text: 'Page', id: 'page' }];
    if (isSelected()) {
      const parents = getParents();
      for (const item of parents) {
        pathArray.push({
          text: getWidgetName(item.type),
          id: item.id || '',
        });
      }
      pathArray.push({
        text: getWidgetName(selectedBlock?.type || ''),
        id: selectedBlock?.id || '',
      });
    }

    setPathArray(pathArray);
  };

  useEffect(() => {
    //is adding mode
    if (addBlockIndex !== -Infinity) {
      setMode('adding');
    } else {
      // selecting a block
      if (isSelected()) {
        setMode('block-setting');
      } else {
        setMode('list-overview');
      }
    }

    updatePath();
  }, [selectedBlockIndex, addBlockIndex, currentListPath.join()]);

  const selectPathItem = (level: number) => {
    if (level === 0) {
      const path = pathArray[level];
      setMode('list-overview');
    } else {
      setMode('block-setting');
    }
  };

  return (
    <div>
      {mode === 'adding' && <AddBlock />}
      {mode !== 'adding' && (
        <>
          <RightElement>
            <Button title="Page settings" onClick={() => setMode('page-setting')}>
              <Settings />
            </Button>
          </RightElement>
          <PageTitle>New page</PageTitle>
          <Space />
          <Path
            selectedId={selectedBlock?.id || 'page'}
            pathArray={pathArray}
            onSelect={selectPathItem}
          />
          <Space />

          {mode === 'list-overview' && (
            <ListOverview data={currentList} selectedIndex={selectedBlockIndex} />
          )}

          {mode === 'block-setting' && (
            <BlockSettings
              {...props}
              selectedBlockIndex={selectedBlockIndex}
            />
          )}

          {mode === 'page-setting' && <PageSetting />}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
