import { useState } from 'react';
import { AddLinkOutlined } from '@mui/icons-material';
import ConfirmDialog from 'dmeditor/components/utility/ConfirmDialog';
import { Editor, Range, Element as SlateElement, Transforms } from 'slate';
import type { Descendant, Node, NodeMatch } from 'slate';
import { useSlate } from 'slate-react';

import { Button, isLinkActive, wrapLink } from './helper';

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const AddLinkButton = () => {
  const editor = useSlate();
  const [visible, setVisible] = useState(false);
  const handleConfirm = (url: string) => {
    if (!url) return;
    insertLink(editor, url);
  };
  return (
    <>
      <Button
        active={isLinkActive(editor)}
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          setVisible(true);
          // const url = window.prompt('Enter the URL of the link:');
          // if (!url) return;
          // insertLink(editor, url);
        }}
      >
        <AddLinkOutlined />
      </Button>
      {visible ? (
        <ConfirmDialog
          visible={visible}
          label="Link url"
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
        />
      ) : null}
    </>
  );
};

export default AddLinkButton;
