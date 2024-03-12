import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Button, ImageList, ImageListItem } from '@mui/material';
import { BrowseImageCallbackParams } from 'dmeditor/config';
import { ImageInfo, setDMEditorCallback } from 'dmeditor/config/index';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';
import { ImageChoose } from 'dmeditor/utils/ImageChoose';

import { ImageEntity } from '../Image';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

const BrowseImage: React.FC<{
  value: BrowseImageCallbackParams;
  onChange: (value: BrowseImageCallbackParams) => void;
}> = (props) => {
  const { onChange, value } = props;

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item, index) => (
        <ImageListItem key={item.img}>
          <img
            style={{
              cursor: 'pointer',
              border: value?.some((item) => item.id === index) ? '3px solid #ff5722' : 'none',
            }}
            onClick={() =>
              onChange([
                {
                  src: item.img,
                  thumbnail: `${item.img}?w=164&h=164&fit=crop&auto=format`,
                  id: index,
                },
              ])
            }
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

setDMEditorCallback({ browseImage: BrowseImage });

export const Source = () => {
  const [visible, setVisible] = useState(false);
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { value } = data || {};

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = (value: BrowseImageCallbackParams) => {
    setVisible(false);
    updateSelectedBlock<ImageEntity>((blockData) => {
      blockData.value = { ...value[0] };
    });
  };

  useEffect(() => {
    if (!value?.src) {
      setVisible(true);
    }
  }, []);

  return (
    <>
      <PropertyItem label="Source">
        {value?.src && (
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
            src={value?.thumbnail ?? value.src}
          />
        )}
        <Button color="info" onClick={() => setVisible(true)}>
          Choose
        </Button>
      </PropertyItem>
      <ImageChoose
        defaultValue={[value as ImageInfo]}
        visible={visible}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
