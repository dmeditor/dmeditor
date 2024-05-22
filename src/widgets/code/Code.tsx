import { useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import {
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

export function Code(props: DME.WidgetRenderProps<CodeEntity>) {
  const {
    rootClasses,
    blockNode: {
      data: { content },
    },
  } = props;

  const { updateSelectedBlock } = useEditorStore();
  const [open, setOpen] = useState(!content);
  const [value, setValue] = useState('');
  let mounted = false;

  const handleClose = () => {
    setOpen(false);
    mounted = true;
  };

  const handleOk = () => {
    handleClose();
    updateSelectedBlock((data) => {
      data.content = value;
    });
  };

  return (
    <div className={rootClasses}>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
            <TextField
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
    </div>
  );
}
