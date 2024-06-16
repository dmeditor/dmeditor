import { ContentCopy, ContentPaste } from '@mui/icons-material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const CopyPaste = () => {
  const {
    setCopyBlock,
    getCurrentBlock,
    getCopyBlock,
    copyBlock: copiedBlock,
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

    if (!copyBlock) {
      return;
    }

    moveTo(copyBlock, [...currentListPath, blockIndex + 1]);
  };

  return (
    <>
      <PropertyButton color="warning" title="Copy" onClick={handleCopy}>
        <ContentCopy />
      </PropertyButton>
      {copiedBlock && (
        <PropertyButton color="warning" title="Paste under" onClick={handlePaste}>
          <ContentPaste />
        </PropertyButton>
      )}
    </>
  );
};
