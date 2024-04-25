import { BorderLeft, BorderRight, Delete } from '@mui/icons-material';

import { useEditorStore } from '../../../core';
import { PropertyButton, PropertyItem } from '../../../core/utils';
import { useTableStore } from '../store';

export const TableColumn = () => {
  const { activeCellIndex, setActiveCellIndex } = useTableStore();
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data: blockData } = getSelectedBlock() || {};

  if (!blockData || !Array.isArray(blockData.value)) {
    return null;
  }

  const handleInsertCol = (position: 'left' | 'right') => {
    const activeColumnIndex = activeCellIndex[1];

    if (position === 'left') {
      setActiveCellIndex([activeCellIndex[0], activeColumnIndex + 1]);

      updateSelectedBlock((data) => {
        if (Array.isArray(data.value)) {
          data.value?.forEach?.((row: any[]) => row.splice(activeColumnIndex, 0, ''));
        }
      });
    } else {
      setActiveCellIndex([activeCellIndex[0], activeColumnIndex]);
      updateSelectedBlock((data) => {
        if (Array.isArray(data.value)) {
          data.value.forEach((row: any[]) => row.splice(activeColumnIndex + 1, 0, ''));
        }
      });
    }
  };

  const handleDeleteCol = () => {
    const activeColumnIndex = activeCellIndex[1];

    setActiveCellIndex([activeCellIndex[0], activeColumnIndex - 1]);
    updateSelectedBlock((data) => {
      if (Array.isArray(data.value)) {
        data.value.forEach((row: any[]) => row.splice(activeColumnIndex, 1));
      }
    });
  };

  return (
    <PropertyItem label="Column">
      <PropertyButton title="insert on left" onClick={() => handleInsertCol('left')}>
        <BorderLeft />
      </PropertyButton>
      <PropertyButton title="insert on right" onClick={() => handleInsertCol('right')}>
        <BorderRight />
      </PropertyButton>
      <PropertyButton
        title="Delete row"
        color="warning"
        disabled={blockData.value?.[0].length === 1}
        onClick={handleDeleteCol}
      >
        <Delete />
      </PropertyButton>
    </PropertyItem>
  );
};
