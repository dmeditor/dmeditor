import { useRef } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { ImageChooser, ImageRef } from 'dmeditor/components/utility/ImageChooser';
import { BrowseImageCallbackParams } from 'dmeditor/config';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

import { ImageEntity } from '../Image';

export const Source = () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { src, thumbnail } = data || {};

  const imageRef = useRef<ImageRef>(null);

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    updateSelectedBlock<ImageEntity>((blockData) => {
      blockData.src = value[0]?.src;
      blockData.externalId = value[0]?.id;
      blockData.thumbnail = value[0]?.thumbnail;
    });
  };

  const handleOpen = () => {
    imageRef.current?.open();
  };

  return (
    <>
      <PropertyItem label="Source">
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
      </PropertyItem>
      <ImageChooser
        ref={imageRef}
        value={[{ src: src || '', id: data?.externalId }]}
        defaultVisible={!src}
        onConfirm={handleConfirm}
      />
    </>
  );
};
