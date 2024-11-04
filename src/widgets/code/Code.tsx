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

import { DME, useEditorStore } from '../..';
import { CodeEntity } from './entity';
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
  const divRef = useRef<HTMLDivElement>(null);
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
      {content ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: content }} ref={divRef} />
          {props.mode === 'edit' && !props.active && (
            <CodeMask height={divRef?.current?.clientHeight || 0} />
          )}
        </>
      ) : (
        <div>Please Input Code Content</div>
      )}
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
                Important: <br />
                1. Code is used for case where there is no available widget, use widget if there is
                insetad of Code. eg. Facebook page widget. <br />
                2. Code doesn't support javascript tag for now. (Workaround: ask project dever to
                add javascript if needed.)
              </Alert>
            </div>
            <TextField
              sx={{ mt: 2 }}
              autoFocus
              multiline
              rows={10}
              fullWidth
              value={value}
              placeholder="Please Input Code Content"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </StyledCode>
  );
}
