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
  // editor selection is lost when the dialog is opened
  const [tempSelection, setTempSelection] = useState(editor.selection);

  const handleConfirm = (url: string) => {
    if (!url) return;
    if (!editor.selection?.anchor.offset && !editor.selection?.focus.offset) {
      editor.selection = tempSelection;
    }
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
          setTempSelection(editor.selection);
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
