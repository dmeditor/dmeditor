import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { nanoid } from 'nanoid';

import { dmeConfig, generalSettings, useEditorStore } from '../..';
import type { DME, DMEData } from '../..';

export type IFrameEntity = {
  value: string;
  settings: {
    height: number;
    general?: DMEData.GeneralSettingType;
  };
};

const ConfirmDialog = (props: { onConfirm: (value: string) => void; onCancel?: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [url, setUrl] = useState('');

  const handleConfirm = () => {
    setVisible(false);
    props.onConfirm(url);
  };

  const handleClose = () => {
    setVisible(false);
    props.onCancel?.();
  };

  return (
    <Dialog open={visible} fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="url"
          label="iframe url"
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

export const IFrame = (props: DME.WidgetRenderProps<IFrameEntity>) => {
  const { updateBlockByPath } = useEditorStore();
  const { data } = props.blockNode || {};

  const handleConfirm = (value: string) => {
    updateBlockByPath(props.path, (blockData) => {
      blockData.value = value;
    });
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {!!data.value && (
        <iframe src={data.value} style={{ height: data.settings.height, display: 'block' }} />
      )}
    </>
  );
};

export const iFrameDefinition: DME.Widget = {
  category: 'basic',
  icon: 'iframe',
  name: 'IFrame',
  type: 'iframe',
  events: {
    createBlock: (): DMEData.Block<IFrameEntity> => {
      const defaultStyle = dmeConfig.widgets['iframe']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        type: 'iframe',
        ...styleObj,
        data: {
          value: '',
          settings: {
            height: 300,
            general: { align: 'center' },
          },
        },
      };
    },
    updateData: (settings, data) => {},
  },
  settings: [
    {
      name: 'Url',
      property: '.value',
      settingComponent: 'link',
    },
    {
      name: 'Height',
      property: 'settings.height',
      settingComponent: 'range',
      category: 'block',
      parameters: { min: 300, max: 1000 },
    },
    ...generalSettings,
  ],
};
