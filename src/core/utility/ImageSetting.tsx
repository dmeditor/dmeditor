import { useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';

import { dmeConfig, type BrowseImageCallbackParams, type ImageInfo } from '../config';
import { ImageChooser } from './ImageChooser';

export const ImageSetting = (props: {
  defaultVisible?: boolean;
  value: ImageInfo;
  onChange: (value: ImageInfo) => void;
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
              width: 80%;
              cursor: pointer;
              border-radius: 5px;
              &:hover {
                opacity: 0.8;
              }
            `}
            src={dmeConfig.general.imagePath(src, 'thumbnail')}
          />
        )}
        <Button color="info" onClick={handleOpen}>
          Choose
        </Button>
        {dmeConfig.plugins.imageHandlers.map((Item) => (
          <Item image={value} onChange={onChange} />
        ))}
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
