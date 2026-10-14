import { useState } from 'react';
import { css } from '@emotion/css';
import { DeleteOutline } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { dmeConfig, type BrowseImageCallbackParams } from '../config';
import { i18n } from '../i18n';
import { DME } from '../types';
import { ImageChooser } from './ImageChooser';

export const ImageSetting = (props: {
  defaultVisible?: boolean;
  value: DME.ImageInfo;
  parameters?: { [key: string]: unknown };
  previewMaxSize?: number;
  onChange: (value?: DME.ImageInfo) => void;
}) => {
  const { value, onChange, defaultVisible = false, previewMaxSize = 100 } = props;
  const { src } = value;
  const [visible, setVisible] = useState(defaultVisible ?? false);

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    onChange(value[0]);
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  return (
    <>
      <div className="dme-utility-imageSetting">
        {src && (
          <span
            className={css`
              display: inline-flex;
              align-items: center;
            `}
          >
            <img
              onClick={handleOpen}
              className={css`
                max-width: ${previewMaxSize}px;
                max-height: ${previewMaxSize}px;
                margin-right: 5px;
                cursor: pointer;
                border-radius: 5px;
                &:hover {
                  opacity: 0.8;
                }
              `}
              src={dmeConfig.general.imagePath(src, 'thumbnail')}
            />
            <IconButton size="small" color="error" title={i18n('Delete')} onClick={handleClear}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </span>
        )}
        <div>
          <Button color="info" onClick={handleOpen}>
            {i18n('Choose')}
          </Button>
          {dmeConfig.plugins.imageHandlers.map((Item, index) => (
            <Item key={index} image={value} parameters={props.parameters} onChange={onChange} />
          ))}
        </div>
      </div>
      <ImageChooser
        value={[{ src: src || '', id: value?.id }]}
        visible={visible}
        multiple={false}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
