import React, { useState } from 'react';
import { SaveAltOutlined, SaveAsOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';

import { DMEData } from '../../src';
import { SavedBlockData } from '../../src/core/config';

const list: Array<SavedBlockData & { id: string; widget: string }> = [];

export const getSavedBlocks = (widget: string) => {
  const result = list.filter((item) => item.widget === widget);
  return result;
};

export const SaveBlock = (props: { blockData: DMEData.Block }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');

  const save = () => {
    setShowConfirm(true);
  };

  const confirmSave = () => {
    list.push({
      id: new Date().toString(),
      widget: props.blockData.type,
      name: name,
      image: '',
      savedData: props.blockData,
    });
    setShowConfirm(false);
  };
  return (
    <span>
      <Dialog open={showConfirm}>
        <DialogTitle>Input to save [{props.blockData.type}]</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField label="Image" type="file" size="small" fullWidth />
          <DialogActions>
            <Button onClick={confirmSave}>Confirm</Button>
            <Button variant="text" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Button title="Save" color="warning" onClick={save}>
        <SaveAsOutlined />
      </Button>
    </span>
  );
};
