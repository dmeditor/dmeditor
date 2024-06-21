import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const Move = (props: { blockPath: Array<number> }) => {
  const { blockPath } = props;

  const { removeByPath, setSelected, moveTo, getBlockByPath, storage } = useEditorStore();

  const handleMoveUp = () => {
    if (blockPath.length === 0) {
      return;
    }
    const currentBlock = getBlockByPath(blockPath);
    const targetIndex = blockPath[blockPath.length - 1] - 1;

    if (targetIndex < 0 || !currentBlock) {
      return;
    }

    //todo: put these 3 into state
    removeByPath(blockPath);
    moveTo(currentBlock, [...blockPath.slice(0, blockPath.length - 1), targetIndex]);
    setSelected(targetIndex);
  };
  const handleMoveDown = () => {
    if (blockPath.length === 0) {
      return;
    }

    const currentBlock = getBlockByPath(blockPath);
    const blockIndex = blockPath[blockPath.length - 1];
    const targetIndex = blockIndex + 1;
    const currentList =
      blockPath.length === 1
        ? storage
        : getBlockByPath(blockPath.slice(0, blockPath.length - 1)).children;

    console.log(targetIndex);
    console.log(currentList);
    if (!currentBlock || !currentList || targetIndex >= currentList.length) {
      return;
    }

    removeByPath(blockPath);
    moveTo(currentBlock, [...blockPath.splice(0, blockPath.length - 1), targetIndex]);
    setSelected(targetIndex);
  };

  return (
    <>
      <Button color="warning" title="Move up" onClick={handleMoveUp}>
        <ArrowUpward />
      </Button>
      <Button color="warning" title="Move down" onClick={handleMoveDown}>
        <ArrowDownward />
      </Button>
    </>
  );
};
