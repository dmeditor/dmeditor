import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { getCommonSettings } from 'dmeditor/core/setting-panel/property-setting';

import { dmeConfig, generalSettings, i18n, useDevice, useEditorStore } from '../..';
import type { DME, DMEData } from '../..';

export type IFrameEntity = {
  value: string;
  settings: {
    height: number;
    heightMobile?: number;
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
        <Button onClick={handleClose}>{i18n('Cancel')}</Button>
        <Button onClick={handleConfirm}>{i18n('Confirm')}</Button>
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

  const device = useDevice();

  return (
    <>
      {!!data.value && (
        <>
          <iframe
            src={data.value}
            allowFullScreen
            style={{
              border: 'none',
              height:
                device === 'mobile'
                  ? data.settings.heightMobile || data.settings.height
                  : data.settings.height,
              display: 'block',
            }}
          />
        </>
      )}
    </>
  );
};

export const iFrameDefinition: DME.Widget = {
  category: 'basic',
  icon: 'iframe',
  name: 'IFrame',
  type: 'iframe',
  editMask: true,
  events: {
    createBlock: (): DMEData.CreatedBlock<IFrameEntity> => {
      return {
        type: 'iframe',
        data: {
          value: '',
          settings: {
            height: 300,
            general: { align: 'center', width: '80%' },
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
      parameters: { urlOnly: true, showDialogWhenEmpty: true },
    },
    {
      name: 'Height',
      identifier: 'iframe-height',
      property: 'settings.height',
      settingComponent: 'range',
      category: 'style',
      parameters: { min: 300, max: 2000, step: 5, showInput: true },
    },
    {
      name: 'Height mobile',
      identifier: 'iframe-height-mobile',
      property: 'settings.heightMobile',
      settingComponent: 'range',
      category: 'style',
      parameters: { min: 300, max: 3000, step: 5, showInput: true },
    },
  ],
};
