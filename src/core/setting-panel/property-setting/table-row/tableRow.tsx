import { BorderBottom, BorderTop, Delete } from '@mui/icons-material';

import { useEditorStore } from 'Core/index';
import { PropertyButton, PropertyItem } from 'Core/utils';

export default () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data: blockData } = getSelectedBlock();

  const handleInsertRow = (position: 'top' | 'bottom') => {
    const newRow = blockData.value[0].map(() => '');
    const activeRowIndex = blockData.activeCellIndex[0];

    if (position === 'top') {
      updateSelectedBlock((data) => {
        data.value.splice(activeRowIndex, 0, newRow);
        data.activeCellIndex = [activeRowIndex + 1, data.activeCellIndex[1]];
      });
    } else {
      updateSelectedBlock((data) => data.value.splice(activeRowIndex + 1, 0, newRow));
    }
  };

  const handleDeleteRow = () => {
    const activeRowIndex = blockData.activeCellIndex[0];

    updateSelectedBlock((data) => {
      data.activeCellIndex = [activeRowIndex - 1, blockData.activeCellIndex[1]];
      data.value.splice(activeRowIndex, 1);
    });
  };

  return (
    <>
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
    </>
  );
};
