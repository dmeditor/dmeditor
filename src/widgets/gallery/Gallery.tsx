import React, { useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';
import { DME } from 'dmeditor/index';

import { GalleryEntity } from './entity';
import {
  GalleryContainer,
  GalleryDialog,
  GalleryImage,
  GalleryItem,
  GalleryList,
  IconWrapper,
} from './styled';

export function Gallery(props: DME.WidgetRenderProps<GalleryEntity>) {
  const {
    blockNode: {
      data: { items },
    },
    rootClasses,
  } = props;

  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    setOpen(true);
    setSelectedImageIndex(index);
  };

  const handleClose = (_evt: React.SyntheticEvent, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <>
      <GalleryContainer className={'dme-gallery-container ' + rootClasses}>
        <GalleryList className="dme-gallery-imgList">
          {items.map((item, index) => (
            <GalleryItem
              className={'dme-gallery-imgItem'}
              key={item.image}
              onClick={() => handleClick(index)}
            >
              <img src={item.image} alt={item.title} />
            </GalleryItem>
          ))}
        </GalleryList>
      </GalleryContainer>
      <Dialog maxWidth={false} open={open} onClose={handleClose}>
        <DialogContent>
          <GalleryDialog>
            <IconWrapper onClick={handlePrev}>
              <KeyboardArrowLeft fontSize="large" />
            </IconWrapper>
            {selectedImageIndex !== -1 && (
              <img
                className={GalleryImage + ' dme-gallery-imgPrevItem'}
                src={items[selectedImageIndex].image}
                alt=""
              />
            )}
            <IconWrapper onClick={handleNext}>
              <KeyboardArrowRight fontSize="large" />
            </IconWrapper>
          </GalleryDialog>
        </DialogContent>
      </Dialog>
    </>
  );
}
