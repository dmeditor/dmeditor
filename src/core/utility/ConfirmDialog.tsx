import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

const { useState } = React;
const ConfirmDialog = (props: {
  label?: string;
  value?: string;
  visible: boolean;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
}) => {
  // const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState(props.value ?? '');

  const handleConfirm = () => {
    // setVisible(false);
    props.onConfirm(url);
  };

  const handleClose = () => {
    // setVisible(false);
    props.onCancel?.();
  };

  return (
    <Dialog open={props.visible} fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="url"
          label={props.label ?? 'url'}
          fullWidth
          variant="standard"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
