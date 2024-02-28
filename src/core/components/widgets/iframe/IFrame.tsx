import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import type { DME, DMEData } from 'Core/index';
import { useEditorStore } from 'Core/index';

export type IFrameEntity = {
  value: string;
  settings: {
    width: number;
    height: number;
    align: 'left' | 'center' | 'right';
  };
};

const IFrameContainer = styled.div<IFrameEntity['settings']>((props) => {
  return {
    display: 'flex',
    justifyContent:
      props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%',

    '& iframe': {
      width: props.width,
      height: props.height,
    },
  };
});

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

export const IFrame = () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<IFrameEntity>() || {};

  const handleConfirm = (value: string) => {
    updateSelectedBlock((blockData) => {
      blockData.value = value;
    });
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <ConfirmDialog onConfirm={handleConfirm} />
      {!!data.value && (
        <IFrameContainer {...data.settings}>
          <iframe src={data.value} />
        </IFrameContainer>
      )}
    </>
  );
};

export const iFrameDefinition: DME.Widget = {
  category: 'widget',
  icon: 'PagesOutlinedIcon',
  name: 'IFrame',
  type: 'iframe',
  events: {
    createBlock: (): DMEData.Block<IFrameEntity> => {
      return {
        id: 'iframe',
        type: 'iframe',
        data: {
          value: '',
          settings: {
            width: 300,
            height: 300,
            align: 'center',
          },
        },
      };
    },
    updateData: (settings, data) => {},
  },
  settings: [
    {
      name: 'Width',
      property: 'settings.width',
      settingComponent: 'range',
      parameters: { min: 300, max: 1000 },
    },
    {
      name: 'Height',
      property: 'settings.height',
      settingComponent: 'range',
      parameters: { min: 300, max: 1000 },
    },
    {
      name: 'Align',
      property: 'settings.align',
      settingComponent: 'align',
    },
  ],
};
