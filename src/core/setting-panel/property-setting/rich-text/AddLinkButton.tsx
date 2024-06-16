import { useState } from 'react';
import { AddLinkOutlined } from '@mui/icons-material';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { isUrl } from '../../../../core/utils';
import { useAlert } from '../../../hooks/useAlert';
import { ConfirmDialog } from '../../../utility';
import { Button, getLink, isLinkActive, wrapLink } from './helper';

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const AddLinkButton = () => {
  const editor = useSlate();
  const [visible, setVisible] = useState(false);
  const link = getLink(editor);
  const { showAlert, AlertComponent } = useAlert();

  const handleConfirm = (url: string) => {
    if (!url) return;
    if (!isUrl(url)) {
      showAlert('Invalid Url', 'warning');
      return;
    }
    insertLink(editor, url);
    setVisible(false);
  };

  return (
    <>
      <Button
        active={isLinkActive(editor)}
        // use onMouseDown instead of onClick to avoid editor reset focus
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          setVisible(true);
        }}
      >
        <AddLinkOutlined />
      </Button>
      {visible ? (
        <ConfirmDialog
          visible={visible}
          value={link}
          label="Link url"
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
        />
      ) : null}
      {AlertComponent}
    </>
  );
};

export default AddLinkButton;
