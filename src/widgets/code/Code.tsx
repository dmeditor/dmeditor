import { useRef, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';

import { DME, i18n, useEditorStore } from '../..';
import { CodeEntity } from './entity';
import { HtmlWithScript } from './HtmlWithScript';
import { CodeMask, StyledCode } from './styled';

export function Code(props: DME.WidgetRenderProps<CodeEntity>) {
  const {
    blockNode: {
      data: { content },
    },
    path,
  } = props;

  const { updateBlockByPath } = useEditorStore();
  const [open, setOpen] = useState(!content);
  const [value, setValue] = useState('');
  let mounted = false;

  const handleClose = () => {
    setOpen(false);
    mounted = true;
  };

  const handleOk = () => {
    handleClose();
    updateBlockByPath(path, (data) => {
      data.content = value;
    });
  };

  return (
    <StyledCode editMode={props.mode === 'edit'}>
      {content ? <HtmlWithScript html={content} /> : <div>Please Input Code Content</div>}
      {!mounted && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <span>Code</span>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={handleClose}
            >
              <CloseOutlined />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ width: 500 }}>
            <div>
              <Alert severity="warning">
                Note: <br />
                1. The Code supports inline css and javascript(inline or external, but script should
                be under root level not inside a tag). <br />
                2. It gives a better editorial experience and flexibility to develop widget instead
                of using Code. eg. Facebook page widget. <br />
              </Alert>
            </div>
            <TextField
              sx={{ mt: 2 }}
              autoFocus
              multiline
              rows={10}
              fullWidth
              value={value}
              placeholder="Please input html code"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{i18n('Cancel')}</Button>
            <Button onClick={handleOk}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </StyledCode>
  );
}
