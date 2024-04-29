import * as React from 'react';
import { ArrowBack, Settings } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidgetName } from '../../core/utils/register';
import { useEditorStore } from '../main/store';
import { AddBlock } from './AddBlock';
import { BlockSettings } from './BlockSettings';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import { ClickEditInput, PageTitle, RightElement, SettingHeader, Space } from './style';

const { useEffect, useState } = React;

const ClickToEdit = (props: { value: string; onChange: (value: string) => void }) => {
  const [editMode, setEditMode] = useState(false);

  const [value, setValue] = useState(props.value);

  const applyChange = () => {
    if (value) {
      setEditMode(false);
      props.onChange(value);
    } else {
      setValue(props.value);
    }
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div onClick={() => setEditMode(true)}>
      <ClickEditInput
        value={value}
        readOnly={!editMode}
        placeholder="Input title"
        onBlur={applyChange}
        onChange={(e) => setValue(e.target.value)}
      />
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
    clearSelected,
    updateSelectedBlockIndex,
  } = useEditorStore((state) => state);

  const { index: addBlockIndex, position: addBlockPosition } = addBlockData || {};

  const [mode, setMode] = useState<SettingPanelMode>('list-overview');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);
  const [selectedPathIndex, setSelectedPathIndex] = useState<number>();
  console.log('🚀 ~ SettingPanel ~ setSelectedPathIndex:', selectedPathIndex);

  const currentList = getCurrentList();
  // const selectedBlock = useMemo(() => getSelectedBlock(), [blockId]);
  const selectedBlock = getSelectedBlock();

  const updatePath = () => {
    const pathArray: Array<PathItem> = [{ text: 'Page', id: 'page', dataPath: [] }];
    if (isSelected()) {
      const parents = getParents();
      for (const item of parents) {
        if (item.type) {
          pathArray.push({
            text: getWidgetName(item.type),
            id: item.id || '',
            dataPath: item.path,
          });
        }
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

  const setSettingMode = () => {
    // selecting a block
    if (isSelected()) {
      setMode('block-setting');
    } else {
      setMode('list-overview');
    }
  };

  useEffect(() => {
    //is adding mode
    if (addBlockData && addBlockData.status === 'started') {
      setMode('adding');
    } else {
      setSettingMode();
    }

    updatePath();
  }, [selectedBlockIndex, addBlockIndex, currentListPath.join()]);

  const selectPathItem = (level: number) => {
    if (level === 0) {
      setMode('list-overview');
      clearSelected();
      // const block = pathArray[1];
      // updateSelectedBlockIndex(block.dataPath, block.id);
    } else {
      setMode('block-setting');
      if (!pathArray[level].disableClick) {
        setSelectedPathIndex(level);
      }

      // update selected block
      const block = pathArray[level];
      updateSelectedBlockIndex(block.dataPath, block.id);
    }
  };

  const setPageSettingMode = () => {
    setMode('page-setting');
  };

  return (
    <div>
      {mode === 'adding' && <AddBlock />}
      {mode !== 'adding' && (
        <>
          <RightElement>
            <Button title="Page settings" onClick={setPageSettingMode}>
              <Settings />
            </Button>
          </RightElement>
          <PageTitle>
            <ClickToEdit value={page.title} onChange={(v) => updatePage(v, 'title')} />
          </PageTitle>
          <Space />
          {['list-overview', 'block-setting'].includes(mode) && (
            <Path
              selectedId={selectedBlock?.id || 'page'}
              pathArray={pathArray}
              onSelect={selectPathItem}
            />
          )}

          {mode === 'list-overview' && (
            <>
              <Space />
              <ListOverview data={currentList || []} selectedIndex={selectedBlockIndex} />
            </>
          )}

          {mode === 'block-setting' && selectedPathIndex && (
            <BlockSettings {...props} dataPath={pathArray[selectedPathIndex].dataPath} />
          )}

          {mode === 'page-setting' && (
            <>
              <RightElement>
                <Button onClick={() => setSettingMode()} title="Back">
                  <ArrowBack /> back
                </Button>
              </RightElement>
              <PageSetting />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
