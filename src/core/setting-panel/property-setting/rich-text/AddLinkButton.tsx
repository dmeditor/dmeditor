import { useState } from 'react';
import { AddLinkOutlined } from '@mui/icons-material';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import ConfirmDialog from '../../../utility/ConfirmDialog';
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
    setVisible(false);
  };
  return (
    <>
      <Button
        active={isLinkActive(editor)}
        onClick={(event: MouseEvent) => {
          event.preventDefault();
          setVisible(true);
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
