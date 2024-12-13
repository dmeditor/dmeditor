import * as React from 'react';
import { useMemo } from 'react';
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
import { BlockSettings } from './block-setting/BlockSettings';
import { isEmbedOwnSetting } from './block-setting/embedSetting';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import { AlignRight, ClickEditInput, PageTitle, RightElement, SettingHeader, Space } from './style';

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
  // const selectedBlock = useMemo(() => getSelectedBlock(), [blockId]);
  const selectedBlock = getSelectedBlock();
  const [rootBlock, rootBlockPath] = selectedBlock?.isEmbed
    ? getClosestBlock(selectedPath)
    : [selectedBlock, selectedPath];

  const currentList = getCurrentList();

  const updatePath = () => {
    const pathArray: Array<PathItem> = [{ text: 'Page', id: 'page', dataPath: [] }];
    if (isSelected() && rootBlockPath) {
      //parents
      const parents = getParents(rootBlockPath);
      for (const item of parents) {
        if (item.type && !item.isEmbed) {
          pathArray.push({
            text: getWidgetName(item.type),
            id: item.id || '',
            dataPath: item.path,
          });
        }
      }

      //push current
      pathArray.push({
        text: getWidgetName(rootBlock?.type || ''),
        id: rootBlock?.id || '',
        dataPath: rootBlockPath,
      });
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
                data={Array.isArray(currentList) ? currentList : []}
                blockPath={[]}
                selectedIndex={selectedBlockIndex}
              />
            </>
          )}

          {mode === 'block-setting' &&
            isSelected() &&
            rootBlockPath &&
            rootBlock &&
            selectedBlock && (
              <>
                {isEmbedOwnSetting(
                  selectedBlock,
                  selectedPath.slice(rootBlockPath.length),
                  rootBlock.type,
                ) ? (
                  <div>
                    <AlignRight>
                      <Button
                        onClick={() => updateSelectedBlockIndex(rootBlockPath, rootBlock?.id || '')}
                      >
                        Back to {getWidgetName(rootBlock?.type || '')}
                      </Button>
                    </AlignRight>
                    <BlockSettings
                      blockPath={selectedPath}
                      blockData={selectedBlock}
                      selectedPath={selectedPath}
                      embedLevel={selectedPath.length - rootBlockPath.length}
                      rootWidget={rootBlock.type}
                    />
                  </div>
                ) : (
                  <BlockSettings
                    blockPath={rootBlockPath}
                    blockData={rootBlock}
                    selectedPath={selectedPath}
                    rootWidget={rootBlock.type}
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
