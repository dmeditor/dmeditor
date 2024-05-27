import { BorderLeft, BorderRight, Delete } from '@mui/icons-material';

import { DME, useEditorStore } from '../../..';
import { PropertyButton, PropertyItem } from '../../../core/utils';
import { useTableStore } from '../store';

export const TableColumn = (props: DME.SettingComponentProps) => {
  const { blockPath } = props;
  const { activeCellIndex, setActiveCellIndex } = useTableStore();
  const { updateBlockByPath, getBlockByPath } = useEditorStore();
  const { data: blockData } = getBlockByPath(blockPath) || {};

  if (!blockData || !Array.isArray(blockData.value)) {
    return null;
  }

  const handleInsertCol = (position: 'left' | 'right') => {
    const activeColumnIndex = activeCellIndex[1];

    if (position === 'left') {
      setActiveCellIndex([activeCellIndex[0], activeColumnIndex + 1]);

      updateBlockByPath(blockPath, (data) => {
        if (Array.isArray(data.value)) {
          data.value?.forEach?.((row: any[]) => row.splice(activeColumnIndex, 0, null));
        }
      });
    } else {
      setActiveCellIndex([activeCellIndex[0], activeColumnIndex]);
      updateBlockByPath(blockPath, (data) => {
        if (Array.isArray(data.value)) {
          data.value.forEach((row: any[]) => row.splice(activeColumnIndex + 1, 0, null));
        }
      });
    }
  };

  const handleDeleteCol = () => {
    const activeColumnIndex = activeCellIndex[1];

    setActiveCellIndex([activeCellIndex[0], activeColumnIndex - 1]);
    updateBlockByPath(blockPath, (data) => {
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
