import React, { useState } from 'react';
import { CloseOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { DME } from 'dmeditor/core/types';
import { partial } from 'lodash';

import { dmeConfig } from '../../core/config';
import { GalleryEntity } from './entity';
import {
  GalleryContainer,
  GalleryDialog,
  GalleryImage,
  GalleryItem,
  GalleryList,
  IconWrapper,
} from './styled';

const generateClassName = (module: string, rule: string) => {
  return `dme-${module}-${rule}`;
};

const galleryClassName = partial(generateClassName, 'gallery');

export function Gallery(props: DME.WidgetRenderProps<GalleryEntity>) {
  const {
    blockNode: {
      data: { items, columns, gap = 10 },
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
      <GalleryContainer>
        <GalleryList columns={columns} gap={gap} className={galleryClassName('img-list')}>
          {items.map((item, index) => (
            <GalleryItem
              className={galleryClassName('img-wrapper')}
              key={item.image}
              onClick={() => handleClick(index)}
            >
              <img src={dmeConfig.general.imagePath(item.image, 'thumbnail')} alt={item.title} />
            </GalleryItem>
          ))}
        </GalleryList>
      </GalleryContainer>
      <Dialog maxWidth={false} open={open} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent>
          <GalleryDialog className={galleryClassName('dialog-content')}>
            <IconWrapper onClick={handlePrev}>
              <KeyboardArrowLeft fontSize="large" />
            </IconWrapper>
            {selectedImageIndex !== -1 && (
              <img
                className={GalleryImage + ` ${galleryClassName('dialog-img')}`}
                src={dmeConfig.general.imagePath(items[selectedImageIndex]?.image)}
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
