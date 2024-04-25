import { LinkOffOutlined } from '@mui/icons-material';
import { useSlate } from 'slate-react';

import { Button, isLinkActive, unwrapLink } from './helper';

const RemoveLinkButton = () => {
  const editor = useSlate();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(_: MouseEvent) => {
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        }
      }}
    >
      <LinkOffOutlined />
    </Button>
  );
};

export default RemoveLinkButton;
