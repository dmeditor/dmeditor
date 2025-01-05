import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import type { DME, DMEData } from '../..';
import { generalSettings, i18n, useEditorStore } from '../..';

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

export const Video = (props: DME.WidgetRenderProps<VideoEntity>) => {
  const { updateBlockByPath } = useEditorStore();
  const { path } = props;
  const { data } = props.blockNode;

  if (!data) {
    return null;
  }

  const videoUrl = data.value;

  return (
    <>
      <Container {...data.settings}>
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
  name: i18n('Video', 'widget'),
  type: 'video',
  events: {
    createBlock: (): DMEData.CreatedBlock<VideoEntity> => {
      return {
        type: 'video',
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
      parameters: { urlOnly: true },
    },
    ...generalSettings,
  ],
};
