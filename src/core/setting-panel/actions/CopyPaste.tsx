import { ContentCopy, ContentPaste } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const CopyPaste = () => {
  const {
    setCopyBlock,
    getCurrentBlock,
    getCopyBlock,
    copyBlock: copiedBlock,
    selected: { currentListPath, blockIndex },
    insertBlock,
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

    if (!copyBlock) {
      return;
    }

    insertBlock(copyBlock, [...currentListPath, blockIndex + 1]);
  };

  return (
    <>
      <Button color="warning" title="Copy" onClick={handleCopy}>
        <ContentCopy />
      </Button>
      {copiedBlock && (
        <Button color="warning" title="Paste under" onClick={handlePaste}>
          <ContentPaste />
        </Button>
      )}
    </>
  );
};
