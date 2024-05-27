import { BorderBottom, BorderTop, Delete } from '@mui/icons-material';

import { DME, useEditorStore } from '../../..';
import { PropertyButton, PropertyItem } from '../../../core/utils';
import { useTableStore } from '../store';

export const TableRow = (props: DME.SettingComponentProps) => {
  const { blockPath } = props;
  const { activeCellIndex, setActiveCellIndex } = useTableStore();
  const { getBlockByPath, updateBlockByPath } = useEditorStore();
  const { data: blockData } = getBlockByPath(blockPath) || {};

  if (!blockData || !Array.isArray(blockData.value)) {
    return null;
  }

  const handleInsertRow = (position: 'top' | 'bottom') => {
    const newRow = (blockData.value as any)[0]?.map(() => null);
    const activeRowIndex = activeCellIndex[0];

    if (position === 'top') {
      setActiveCellIndex([activeRowIndex + 1, activeCellIndex[1]]);

      updateBlockByPath(blockPath, (data) => {
        (data.value as string[][]).splice(activeRowIndex, 0, newRow);
      });
    } else {
      updateBlockByPath(blockPath, (data) =>
        (data.value as string[][]).splice(activeRowIndex + 1, 0, newRow),
      );
    }
  };

  const handleDeleteRow = () => {
    const activeRowIndex = activeCellIndex[0];

    setActiveCellIndex([activeRowIndex - 1, activeCellIndex[1]]);

    updateBlockByPath(blockPath, (data) => {
      if (Array.isArray(data.value)) {
        data.value.splice(activeRowIndex, 1);
      }
    });
  };

  return (
    <PropertyItem label="Row">
      <PropertyButton title="insert on top" onClick={() => handleInsertRow('top')}>
        <BorderTop />
      </PropertyButton>
      <PropertyButton title="insert on bottom" onClick={() => handleInsertRow('bottom')}>
        <BorderBottom />
      </PropertyButton>
      <PropertyButton
        title="Delete row"
        color="warning"
        disabled={blockData.value.length === 1}
        onClick={handleDeleteRow}
      >
        <Delete />
      </PropertyButton>
    </PropertyItem>
  );
};
