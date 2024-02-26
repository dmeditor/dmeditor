import { BorderBottom, BorderTop, Delete } from '@mui/icons-material';

import { useTableStore } from '../../store';
import { useEditorStore } from 'Core/index';
import { PropertyButton, PropertyItem } from 'Core/utils';

export default () => {
  const { activeCellIndex, setActiveCellIndex } = useTableStore();
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data: blockData } = getSelectedBlock();

  const handleInsertRow = (position: 'top' | 'bottom') => {
    const newRow = blockData.value[0].map(() => '');
    const activeRowIndex = activeCellIndex[0];

    if (position === 'top') {
      setActiveCellIndex([activeRowIndex + 1, activeCellIndex[1]]);

      updateSelectedBlock((data) => {
        data.value.splice(activeRowIndex, 0, newRow);
      });
    } else {
      updateSelectedBlock((data) => data.value.splice(activeRowIndex + 1, 0, newRow));
    }
  };

  const handleDeleteRow = () => {
    const activeRowIndex = blockData.activeCellIndex[0];

    setActiveCellIndex([activeRowIndex - 1, activeCellIndex[1]]);

    updateSelectedBlock((data) => {
      data.value.splice(activeRowIndex, 1);
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
