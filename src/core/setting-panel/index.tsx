import * as React from 'react';
import {
  ArrowBack,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  Settings,
} from '@mui/icons-material';
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
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData,
    getSelectedBlock,
    getCurrentList,
    getParents,
    isSelected,
    getClosestBlock,
    page,
    updatePage,
    clearSelected,
    updateSelectedBlockIndex,
  } = useEditorStore((state) => state);

  const { index: addBlockIndex, position: addBlockPosition } = addBlockData || {};

  const [mode, setMode] = useState<SettingPanelMode>('list-overview');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);
  const selectedPath = [...currentListPath, selectedBlockIndex];
  const [rootBlock = null, rootBlockPath = []] = isSelected()
    ? getClosestBlock(selectedPath, (block) => !block?.isEmbed) || []
    : [];

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

      if (selectedBlock && !selectedBlock.isEmbed) {
        pathArray.push({
          text: getWidgetName(selectedBlock?.type || ''),
          id: selectedBlock?.id || '',
          dataPath: [...currentListPath, selectedBlockIndex],
        });
      }
    }

    if (rootBlock) {
      pathArray.forEach((item) => {
        if (item.id === rootBlock.id) {
          item.selected = true;
        }
      });
    }

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

  const selectPathItem = (item: PathItem) => {
    if (item.dataPath.length === 0) {
      setMode('list-overview');
      clearSelected();
    } else {
      setMode('block-setting');
      // update selected block
      updateSelectedBlockIndex(item.dataPath, item.id);
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
            <Path pathArray={pathArray} onSelect={selectPathItem} />
          )}

          {mode === 'list-overview' && (
            <>
              <Space />
              <ListOverview
                data={currentList || []}
                blockPath={[]}
                selectedIndex={selectedBlockIndex}
              />
            </>
          )}

          {mode === 'block-setting' && (
            <>
              {isSelected() && (
                <BlockSettings
                  rootPath={rootBlockPath}
                  rootBlock={rootBlock}
                  selectedPath={selectedPath}
                />
              )}
            </>
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
