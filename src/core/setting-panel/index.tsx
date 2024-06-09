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
  const [closestBlock = null, closestBlockPath = []] = isSelected()
    ? getClosestBlock([...currentListPath, selectedBlockIndex], (block) => !block?.isEmbed) || []
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

    if (closestBlock) {
      pathArray.forEach((item) => {
        if (item.id === closestBlock.id) {
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

  const previous = () => {
    if (selectedBlockIndex > 0) {
      const list = getCurrentList();
      const newPath = [...currentListPath];
      const newIndex = selectedBlockIndex - 1;
      newPath[newPath.length - 1] = newIndex;
      if (list && list[newIndex]) {
        const id = list[newIndex].id;
        updateSelectedBlockIndex(newPath, id || '');
      }
    }
  };

  const next = () => {
    const list = getCurrentList();
    if (!list) {
      return;
    }
    if (selectedBlockIndex <= list.length - 1) {
      const newPath = [...currentListPath];
      const newIndex = selectedBlockIndex + 1;
      newPath[newPath.length - 1] = newIndex;
      if (list && list[newIndex]) {
        const id = list[newIndex].id;
        updateSelectedBlockIndex(newPath, id || '');
      }
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
            <>
              <RightElement>
                <Button
                  title="Previous block"
                  disabled={selectedBlockIndex <= 0}
                  onClick={previous}
                >
                  <ArrowBackIosOutlined style={{ fontSize: 16 }} />
                </Button>
                <Button title="Next block" onClick={next}>
                  <ArrowForwardIosOutlined style={{ fontSize: 16 }} />
                </Button>
              </RightElement>
              <Path pathArray={pathArray} onSelect={selectPathItem} />
            </>
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
            <>{isSelected() && <BlockSettings {...props} dataPath={closestBlockPath} />}</>
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
