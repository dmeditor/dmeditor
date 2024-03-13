import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { ImageChooser } from 'dmeditor/components/utility/ImageChooser';
import { BrowseImageCallbackParams } from 'dmeditor/config';
import { ImageInfo } from 'dmeditor/config/index';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

import { ImageEntity } from '../Image';

export const Source = () => {
  const [visible, setVisible] = useState(false);
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { src, thumbnail } = data || {};

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    setVisible(false);
    updateSelectedBlock<ImageEntity>((blockData) => {
      blockData.src = value[0]?.src;
      blockData.externalId = value[0]?.id;
      blockData.thumbnail = value[0]?.thumbnail;
    });
  };

  useEffect(() => {
    if (!src) {
      setVisible(true);
    }
  }, []);

  return (
    <>
      <PropertyItem label="Source">
        {src && (
          <img
            onClick={() => setVisible(true)}
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
        <Button color="info" onClick={() => setVisible(true)}>
          Choose
        </Button>
      </PropertyItem>
      <ImageChooser
        value={[{ src: src || '', id: data?.externalId }]}
        visible={visible}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
