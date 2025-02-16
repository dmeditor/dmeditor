import React, { useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';

import { BrowseImageCallbackParams } from '../../../src/core/config';

const itemData = [
  {
    img: 'https://dmeditor.c.digimaker.com/var/images/full/images/u/uqq/upload-3380612112-img_1671.jpg',
    title: 'Pic 1',
  },
  {
    img: 'https://dmeditor.c.digimaker.com/var/images/full/images/q/qhf/upload-235630515-img_1681.jpg',
    title: 'Pic 2',
  },
  {
    img: 'https://dmeditor.c.digimaker.com/var/images/full/images/z/zse/upload-3512075529-bg.jpg',
    title: 'Pic 3',
  },
  {
    img: 'https://dmeditor.c.digimaker.com/var/images/full/images/t/tio/upload-21715531-powerpoint.jpg',
    title: 'Pic 4',
  },
  {
    img: 'https://dmeditor.c.digimaker.com/var/images/full/images/n/ndy/upload-3100060534-enterprise.jpg',
    title: 'Pic 5',
  },
];

export const BrowseImage: React.FC<{
  value: BrowseImageCallbackParams;
  multiple?: boolean;
  onChange: (value: BrowseImageCallbackParams) => void;
}> = (props) => {
  const { onChange, value, multiple = false } = props;
  const [localValue, setLocalValue] = useState(value || []);

  const handleSelected = (index: number) => {
    let selectedList: any[] = [];

    if (!multiple) {
      selectedList = [
        {
          src: itemData[index].img,
          id: index,
          thumbnail: `${itemData[index].img}`,
        },
      ];
      setLocalValue(selectedList);
      onChange(selectedList);
      return;
    }

    if (localValue.some((val) => val.id === index)) {
      selectedList = localValue.filter((val) => val.id !== index);
    } else {
      selectedList = [
        ...localValue,
        {
          src: itemData[index].img,
          id: index,
          thumbnail: `${itemData[index].img}`,
        },
      ];
    }

    setLocalValue(selectedList);
    onChange(selectedList);
  };

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item, index) => (
        <ImageListItem key={item.img}>
          <img
            style={{
              cursor: 'pointer',
              border: localValue?.some((val) => val.id === index || val.src === item.img)
                ? '3px solid #ff5722'
                : 'none',
            }}
            onClick={() => handleSelected(index)}
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
