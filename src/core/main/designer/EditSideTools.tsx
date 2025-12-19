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
import { dmeConfig } from 'dmeditor/core/config';

import { scrollBlockToView } from '../../../core/utils';
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

  const previous = (e) => {
    e.stopPropagation();
    const list = getCurrentList();
    if (!list || list.length === 0) {
      return;
    }

    const selected = isSelected();
    const newPath = [...currentListPath];
    if (!selected || (selected && selectedBlockIndex === 0)) {
      const newIndex = list.length - 1;
      const id = list[newIndex].id || '';
      newPath.push(newIndex);
      updateSelectedBlockIndex(newPath, id);
      scrollBlockToView(id);
    } else {
      if (selectedBlockIndex > 0) {
        const newIndex = selectedBlockIndex - 1;
        newPath.push(newIndex);
        if (list && list[newIndex]) {
          const id = list[newIndex].id || '';
          updateSelectedBlockIndex(newPath, id);
          scrollBlockToView(id);
        }
      }
    }
  };

  const next = (e) => {
    e.stopPropagation();
    const list = getCurrentList();
    if (!list || list.length === 0) {
      return;
    }

    const selected = isSelected();
    const newPath = [...currentListPath];
    if (!selected || (selected && selectedBlockIndex === list.length - 1)) {
      const id = list[0].id || '';
      newPath.push(0);
      updateSelectedBlockIndex(newPath, id);
      scrollBlockToView(id);
    } else {
      if (selectedBlockIndex < list.length - 1) {
        const newIndex = selectedBlockIndex + 1;
        newPath.push(newIndex);
        if (list && list[newIndex]) {
          const id = list[newIndex].id || '';
          updateSelectedBlockIndex(newPath, id);
          scrollBlockToView(id);
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
    <SideTool.Container className={dmeConfig.editor.panelClassNames['navigator']}>
      <SideTool.Item>
        <Button variant="outlined" sx={buttonStyle} title="Previous block" onClick={previous}>
          <KeyboardArrowUpOutlined />
        </Button>
      </SideTool.Item>
      <SideTool.Item>
        <Button title="Next block" variant="outlined" sx={buttonStyle} onClick={next}>
          <KeyboardArrowDownOutlined />
        </Button>
      </SideTool.Item>
    </SideTool.Container>
  );
};
