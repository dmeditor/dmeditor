import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { nanoid } from 'nanoid';

import type { DME, DMEData } from '../..';
import { dmeConfig, useEditorStore } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';

export type VideoEntity = {
  value: string;
  settings: {
    width: number;
    height: number;
    align: 'left' | 'center' | 'right';
    general?: DMEData.GeneralSettingType;
  };
};

const Container = styled.div<VideoEntity['settings']>((props) => {
  return {
    display: 'flex',
    justifyContent:
      props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%',

    '& video': {
      width: props.width,
      height: props.height,
    },
  };
});

const ConfirmDialog = (props: {
  value?: string;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
}) => {
  const [visible, setVisible] = useState(true);
  const [url, setUrl] = useState(props.value ?? '');

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
          label="video url"
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

export const Video = (props: DME.WidgetRenderProps<VideoEntity>) => {
  const { updateSelectedBlock } = useEditorStore();
  const { rootClasses } = props;
  const { data } = props.blockNode;

  const handleConfirm = (value: string) => {
    updateSelectedBlock((blockData) => {
      blockData.value = value;
    });
  };

  if (!data) {
    return null;
  }

  const videoUrl = data.value;

  return (
    <>
      <ConfirmDialog onConfirm={handleConfirm} value={videoUrl} />
      <Container {...data.settings} className={rootClasses}>
        <video controls src={videoUrl}>
          <object width="100%" data={videoUrl}>
            <embed width="100%" src={videoUrl} />
          </object>
        </video>
      </Container>
    </>
  );
};

export const VideoDefinition: DME.Widget = {
  category: 'basic',
  icon: 'video',
  name: 'Video',
  type: 'video',
  events: {
    createBlock: (): DMEData.Block<VideoEntity> => {
      const defaultStyle = dmeConfig.widgets['video']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'video',
        ...styleObj,
        data: {
          value: '',
          settings: {
            width: 300,
            height: 240,
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
      parameters: { min: 50, max: 800 },
    },
    {
      name: 'Height',
      property: 'settings.height',
      settingComponent: 'range',
      parameters: { min: 50, max: 800 },
    },
    {
      name: 'Align',
      property: 'settings.align',
      settingComponent: 'align',
    },
    {
      name: 'Url',
      settingComponent: 'link',
      property: '.value',
    },
    ...generalSettings,
  ],
};
