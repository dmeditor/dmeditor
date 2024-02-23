import { BorderLeft, BorderRight, Delete } from '@mui/icons-material';

import { useEditorStore } from 'Core/index';
import { PropertyButton } from 'Core/utils';

export default () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data: blockData } = getSelectedBlock();

  const handleInsertCol = (position: 'left' | 'right') => {
    const activeColumnIndex = blockData.activeCellIndex[1];

    if (position === 'left') {
      updateSelectedBlock((data) => {
        data.activeCellIndex = [data.activeCellIndex[0], activeColumnIndex + 1];
        data.value.forEach((row: any[]) => row.splice(activeColumnIndex, 0, ''));
      });
    } else {
      updateSelectedBlock((data) => {
        data.activeCellIndex = [data.activeCellIndex[0], activeColumnIndex];
        data.value.forEach((row: any[]) => row.splice(activeColumnIndex + 1, 0, ''));
      });
    }
  };

  const handleDeleteCol = () => {
    const activeColumnIndex = blockData.activeCellIndex[1];

    updateSelectedBlock((data) => {
      data.activeCellIndex = [data.activeCellIndex[0], activeColumnIndex - 1];
      data.value.forEach((row: any[]) => row.splice(activeColumnIndex, 1));
    });
  };

  return (
    <>
      <PropertyButton title="insert on left" onClick={() => handleInsertCol('left')}>
        <BorderLeft />
      </PropertyButton>
      <PropertyButton title="insert on right" onClick={() => handleInsertCol('right')}>
        <BorderRight />
      </PropertyButton>
      <PropertyButton
        title="Delete row"
        color="warning"
        disabled={blockData.value[0].length === 1}
        onClick={handleDeleteCol}
      >
        <Delete />
      </PropertyButton>
    </>
  );
};
