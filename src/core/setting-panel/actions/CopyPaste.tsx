import { useState } from 'react';
import { ContentCopy, ContentPaste } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const CopyPaste = () => {
  const {
    setCopyBlock,
    getCurrentBlock,
    getCopyBlock,
    selected: { currentListPath, blockIndex },
    setSelected,
    insertBlock,
  } = useEditorStore();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentBlock = getCurrentBlock();
    if (!currentBlock) {
      return;
    }
    setCopyBlock(currentBlock);
    setCopied(true);
  };

  const handlePaste = () => {
    const copyBlock = getCopyBlock();

    if (!copyBlock || typeof blockIndex !== 'number') {
      return;
    }

    const newIndex = blockIndex + 1;

    insertBlock(copyBlock, [...currentListPath, newIndex]);
    setSelected(newIndex);
  };

  return (
    <>
      <Button color="warning" title="Copy" onClick={handleCopy}>
        <ContentCopy />
      </Button>
      {copied && (
        <Button color="warning" title="Paste under" onClick={handlePaste}>
          <ContentPaste />
        </Button>
      )}
    </>
  );
};
