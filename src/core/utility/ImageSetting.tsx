import { useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';

import { dmeConfig, type BrowseImageCallbackParams } from '../config';
import { i18n } from '../i18n';
import { DME } from '../types';
import { ImageChooser } from './ImageChooser';

export const ImageSetting = (props: {
  defaultVisible?: boolean;
  value: DME.ImageInfo;
  parameters?: { [key: string]: unknown };
  onChange: (value: DMEImageInfo) => void;
}) => {
  const { value, onChange, defaultVisible = false } = props;
  const { src } = value;
  const [visible, setVisible] = useState(defaultVisible ?? false);

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    onChange(value[0]);
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="dme-utility-imageSetting">
        {src && (
          <img
            onClick={handleOpen}
            className={css`
              max-width: 80%;
              max-height: 120px;
              cursor: pointer;
              border-radius: 5px;
              &:hover {
                opacity: 0.8;
              }
            `}
            src={dmeConfig.general.imagePath(src, 'thumbnail')}
          />
        )}
        <div>
          <Button color="info" onClick={handleOpen}>
            {i18n('Choose')}
          </Button>
          {dmeConfig.plugins.imageHandlers.map((Item) => (
            <Item image={value} parameters={props.parameters} onChange={onChange} />
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
