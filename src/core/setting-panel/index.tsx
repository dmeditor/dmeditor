import * as React from 'react';
import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Settings } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidget } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { iteratePath } from '../main/store/operations';
import { AddBlock } from './AddBlock';
import { BlockSettings } from './BlockSettings';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import WidgetSetting from './property-setting/property-item';
import { PageTitle, RightElement, SettingHeader, Space } from './style';
import emitter from 'Core/utils/event';

const { useEffect } = React;

type SettingPanelMode = 'setting' | 'list' | 'page-setting' | 'add-block';

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

  const [mode, setMode] = useState<SettingPanelMode>('list');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);

  const currentList = getCurrentList();
  const selectedBlock = useMemo(() => getSelectedBlock(selectedBlockIndex), [selectedBlockIndex]);

  const updatePath = () => {
    const pathArray: Array<PathItem> = [{ text: 'Page', id: 'page' }];
    if (isSelected()) {
      const parents = getParents();
      for (const item of parents) {
        pathArray.push({
          text: getWidget(item.type)?.name || '',
          id: item.id || '',
        });
      }
      pathArray.push({
        text: getWidget(selectedBlock?.type || '')?.name || '',
        id: selectedBlock?.id || '',
      });
    }

    setPathArray(pathArray);
  };

  useEffect(() => {
    //is adding mode
    if (addBlockIndex !== -Infinity) {
      setMode('add-block');
    } else {
      // selecting a block
      if (isSelected()) {
        setMode('setting');
      }
    }

    updatePath();
  }, [selectedBlockIndex, addBlockIndex, currentListPath.join()]);

  const hasSelect = isSelected();

  const selectPathItem = (level: number) => {
    if (level === 0) {
      const path = pathArray[level];
      setMode('list');
    } else {
      setMode('setting');
    }
  };

  return (
    <div
      className={css`
        padding: 5px;
      `}
    >
      {mode === 'add-block' && <AddBlock />}
      {mode !== 'add-block' && (
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

          {mode === 'list' && (
            <ListOverview data={currentList} selectedIndex={selectedBlockIndex} />
          )}

          {mode === 'setting' && (
            <BlockSettings {...props} selectedBlockIndex={selectedBlockIndex} />
          )}

          {mode === 'page-setting' && <PageSetting />}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
