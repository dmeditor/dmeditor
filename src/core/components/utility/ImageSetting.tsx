import { useRef } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { ImageChooser, ImageRef } from 'dmeditor/components/utility/ImageChooser';
import { BrowseImageCallbackParams, ImageInfo } from 'dmeditor/config';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

export const ImageSetting = (props: {
  defaultVisible?: boolean;
  value: ImageInfo;
  onConfirm: (value: ImageInfo) => void;
}) => {
  const { value, onConfirm, defaultVisible = false } = props;
  const { src, thumbnail } = value;

  const imageRef = useRef<ImageRef>(null);

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    onConfirm(value[0]);
  };

  const handleOpen = () => {
    imageRef.current?.open();
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
        ref={imageRef}
        value={[{ src: src || '', id: value?.id }]}
        defaultVisible={defaultVisible}
        multiple={false}
        onConfirm={handleConfirm}
      />
    </>
  );
};
