import { DeleteOutline } from '@mui/icons-material';
import { useEditorStore } from 'dmeditor/main/store';

import { PropertyButton } from '../Property';

export const CopyPaste = () => {
  const {
    setCopyBlock,
    getCurrentBlock,
    getCopyBlock,
    selected: { currentListPath, blockIndex },
    moveTo,
  } = useEditorStore();

  const handleCopy = () => {
    const currentBlock = getCurrentBlock();
    if (!currentBlock) {
      return;
    }
    setCopyBlock(currentBlock);
  };
  const handlePaste = () => {
    const copyBlock = getCopyBlock();
    console.log('🚀 ~ handlePaste ~ copyBlock:', copyBlock);

    if (!copyBlock) {
      return;
    }

    moveTo(copyBlock, [...currentListPath, blockIndex + 1]);
  };

  return (
    <>
      <PropertyButton color="warning" variant="outlined" title="Copy" onClick={handleCopy}>
        Copy
      </PropertyButton>
      <PropertyButton color="warning" variant="outlined" title="Paste" onClick={handlePaste}>
        Paste
      </PropertyButton>
    </>
  );
};
