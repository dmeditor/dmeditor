import { useRef, useState } from 'react';
import { LinkOutlined } from '@mui/icons-material';
import { BrowseLinkCallbackParams } from 'dmeditor/core/config';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { LinkChooser, LinkRef } from '../../../utility';
import { Button, getLink, isLinkActive, updatedLink, wrapLink } from './helper';

const insertLink = (editor: Editor, url: string, openNew: boolean) => {
  if (editor.selection) {
    // wrapLink(editor, url, openNew);
    updatedLink(editor, url);
  }
};

const AddLinkButton = () => {
  const editor = useSlate();
  const [visible, setVisible] = useState(false);
  const { link, target } = getLink(editor);
  const linkChooserRef = useRef<LinkRef>(null);

  const handleConfirm = (value: BrowseLinkCallbackParams) => {
    if (!value.link) return;
    insertLink(editor, value.link, value.openNew || false);
  };

  return (
    <>
      <Button
        active={isLinkActive(editor)}
        // use onMouseDown instead of onClick to avoid editor reset focus
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          setVisible(true);
          if (linkChooserRef.current) {
            linkChooserRef.current.open();
          }
        }}
      >
        <LinkOutlined />
      </Button>
      {visible ? (
        <LinkChooser
          ref={linkChooserRef}
          defaultVisible={visible}
          showOpenNew={true}
          value={{ link: link, openNew: target === '_blank' }}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  );
};

export default AddLinkButton;
