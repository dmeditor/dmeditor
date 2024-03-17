import { useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { ImageChooser } from 'dmeditor/components/utility/ImageChooser';
import { BrowseImageCallbackParams, ImageInfo } from 'dmeditor/config';

export const ImageSetting = (props: {
  defaultVisible?: boolean;
  value: ImageInfo;
  onConfirm: (value: ImageInfo) => void;
}) => {
  const { value, onConfirm, defaultVisible = false } = props;
  const { src, thumbnail } = value;
  const [visible, setVisible] = useState(defaultVisible ?? false);

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    onConfirm(value[0]);
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
            src={thumbnail ?? src}
          />
        )}
        <Button color="info" onClick={handleOpen}>
          Choose
        </Button>
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
