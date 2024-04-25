import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

import { useEditorStore } from '../../../core';
import { PropertyButton } from '../Property';

export const Move = () => {
  const {
    selected: { currentListPath, blockIndex },
    removeByPath,
    getCurrentBlock,
    setSelected,
    moveTo,
    getCurrentList,
  } = useEditorStore();

  const handleMoveUp = () => {
    const currentBlock = getCurrentBlock();
    const targetIndex = blockIndex - 1;
    console.log('🚀 ~ handleMoveUp ~ targetIndex:', targetIndex);

    if (targetIndex < 0 || !currentBlock) {
      return;
    }

    removeByPath([...currentListPath, blockIndex]);
    moveTo(currentBlock, [...currentListPath, targetIndex]);
    setSelected(targetIndex);
  };
  const handleMoveDown = () => {
    const currentBlock = getCurrentBlock();
    const targetIndex = blockIndex + 1;
    const currentList = getCurrentList() || [];

    if (!currentBlock || targetIndex >= currentList.length) {
      return;
    }

    removeByPath([...currentListPath, blockIndex]);
    moveTo(currentBlock, [...currentListPath, targetIndex]);
    setSelected(targetIndex);
  };

  return (
    <>
      <PropertyButton color="warning" variant="outlined" title="Move up" onClick={handleMoveUp}>
        <ArrowUpward />
      </PropertyButton>
      <PropertyButton color="warning" variant="outlined" title="Move down" onClick={handleMoveDown}>
        <ArrowDownward />
      </PropertyButton>
    </>
  );
};
