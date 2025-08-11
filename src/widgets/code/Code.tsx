import { useEffect, useRef, useState } from 'react';
import { CheckBox, CloseOutlined } from '@mui/icons-material';
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';

import { DME, i18n, useEditorStore } from '../..';
import { CodeEntity } from './entity';
import { HtmlWithScript } from './HtmlWithScript';
import { StyledCode } from './styled';

export function Code(props: DME.WidgetRenderProps<CodeEntity>) {
  const {
    blockNode: {
      data: { content, renderAsIframe },
    },
    path,
  } = props;

  const { updateBlockByPath } = useEditorStore();
  const [open, setOpen] = useState(!content);
  const [value, setValue] = useState('');
  const [createdRenderAsIframe, setCreatedRenderAsIframe] = useState(false);

  let mounted = false;

  const handleClose = () => {
    setOpen(false);
    mounted = true;
  };

  const handleOk = () => {
    handleClose();
    updateBlockByPath(path, (data) => {
      data.content = value;
      data.renderAsIframe = createdRenderAsIframe;
    });
  };

  const setRenderAsIframe = (e: any) => {
    setCreatedRenderAsIframe(e.target.checked);
  };

  return (
    <StyledCode editMode={props.mode === 'edit'}>
      {content ? (
        <HtmlWithScript html={content} renderAsIframe={renderAsIframe} />
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
                Note: <br />
                1. It supports inline css and javascript. <br />
                2. If possible, develop a separate widget other than using Code.
                <br />
              </Alert>
            </div>
            <TextField
              sx={{
                mt: 2,
                '& .MuiInputBase-root': { padding: '5px' },
                fontSize: '12px',
                lineHeight: 1.2,
              }}
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
            <FormControlLabel
              control={<Checkbox />}
              onChange={setRenderAsIframe}
              label="Render as iframe (more javascript friendly)"
            />
            <div style={{ color: '#666666' }}>
              Note: If unchecked, &lt;script&gt; should be under root if there is.
            </div>
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
