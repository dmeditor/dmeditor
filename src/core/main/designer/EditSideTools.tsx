import { useMemo } from 'react';
import {
  ArrowBackIosOutlined,
  ArrowDownward,
  ArrowDropUpOutlined,
  ArrowForwardIosOutlined,
  ArrowUpward,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { next, previous } from 'slate';

import { useEditorStore } from '../store';
import { SideTool } from './style';

export const EditSideTools = () => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData,
    getCurrentList,
    isSelected,
    page,
    updatePage,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const currentList = getCurrentList();

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
    if (!list || list.length === 0) {
      return;
    }

    if (!isSelected()) {
      updateSelectedBlockIndex([0], list[0].id || '');
    } else {
      if (selectedBlockIndex <= list.length - 1) {
        const newPath = [...currentListPath];
        const newIndex = selectedBlockIndex + 1;
        newPath[newPath.length - 1] = newIndex;
        if (list && list[newIndex]) {
          const id = list[newIndex].id;
          updateSelectedBlockIndex(newPath, id || '');
        }
      }
    }
  };

  const buttonStyle = {
    borderRadius: 10,
    background: '#ffffff',
    ':hover': {
      background: '#eeeeee',
    },
  };

  return (
    <SideTool.Container>
      <SideTool.Item>
        <Button
          variant="outlined"
          sx={buttonStyle}
          title="Previous block"
          disabled={!isSelected() || selectedBlockIndex <= 0}
          onClick={previous}
        >
          <KeyboardArrowUpOutlined />
        </Button>
      </SideTool.Item>
      <SideTool.Item>
        <Button
          title="Next block"
          variant="outlined"
          sx={buttonStyle}
          disabled={!currentList || selectedBlockIndex >= currentList.length - 1}
          onClick={next}
        >
          <KeyboardArrowDownOutlined />
        </Button>
      </SideTool.Item>
    </SideTool.Container>
  );
};
