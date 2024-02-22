import * as React from 'react';
import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Settings } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';

import { getWidget, getWidgetName } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { GetDataByPath } from '../main/store/helper';
import { AddBlock } from './AddBlock';
import { BlockSettings } from './BlockSettings';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import { ClickEditInput, PageTitle, RightElement, SettingHeader, Space } from './style';

const { useEffect } = React;

const ClickToEdit = (props: { value: string; onChange: (value: string) => void }) => {
  const [editMode, setEditMode] = useState(false);

  const [value, setValue] = useState(props.value);

  const applyChange = () => {
    setEditMode(false);
    props.onChange(value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div onClick={() => setEditMode(true)}>
      {editMode && (
        <ClickEditInput
          value={value}
          onBlur={applyChange}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {!editMode && <>{value}</>}
    </div>
  );
};

type SettingPanelMode = 'block-setting' | 'list-overview' | 'page-setting' | 'adding';

// const SettingPanel = ({ selectedWidget }: { selectedWidget: string }) => {
const SettingPanel = (props) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath, blockId },
    addBlockData,
    getSelectedBlock,
    getCurrentList,
    getParents,
    isSelected,
    page,
    updatePage,
  } = useEditorStore((state) => state);

  const { index: addBlockIndex, position: addBlockPosition } = addBlockData || {};

  const [mode, setMode] = useState<SettingPanelMode>('list-overview');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);
  const [selectedPathIndex, setSelectedPathIndex] = useState<number>();

  const currentList = getCurrentList();
  // const selectedBlock = useMemo(() => getSelectedBlock(), [blockId]);
  const selectedBlock = getSelectedBlock();

  const updatePath = () => {
    const pathArray: Array<PathItem> = [{ text: 'Page', id: 'page', dataPath: [] }];
    if (isSelected()) {
      const parents = getParents();
      for (const item of parents) {
        pathArray.push({
          text: getWidgetName(item.type),
          id: item.id || '',
          dataPath: item.path,
        });
      }
      pathArray.push({
        text: getWidgetName(selectedBlock?.type || ''),
        id: selectedBlock?.id || '',
        dataPath: [...currentListPath, selectedBlockIndex],
      });
    }

    setSelectedPathIndex(pathArray.length - 1);
    setPathArray(pathArray);
  };

  useEffect(() => {
    //is adding mode
    if (addBlockData && addBlockData.status === 'started') {
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
      setMode('list-overview');
    } else {
      setMode('block-setting');
      if (!pathArray[level].disableClick) {
        setSelectedPathIndex(level);
      }
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
          <PageTitle>
            <ClickToEdit value={page.title} onChange={(v) => updatePage(v, 'title')} />
          </PageTitle>
          <Space />
          <Path
            selectedId={selectedBlock?.id || 'page'}
            pathArray={pathArray}
            onSelect={selectPathItem}
          />
          <Space />

          {mode === 'list-overview' && (
            <ListOverview data={currentList || []} selectedIndex={selectedBlockIndex} />
          )}

          {mode === 'block-setting' && selectedPathIndex && (
            <BlockSettings {...props} dataPath={pathArray[selectedPathIndex].dataPath} />
          )}

          {mode === 'page-setting' && <PageSetting />}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
