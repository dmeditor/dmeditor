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
  ImageIndicator,
  PaginationContainer,
  VerticalMiddle,
} from './styled';

const generateClassName = (module: string, rule: string) => {
  return `dme-${module}-${rule}`;
};

const galleryClassName = partial(generateClassName, 'gallery');

export function Gallery(props: DME.WidgetRenderProps<GalleryEntity>) {
  const {
    blockNode: {
      data: { items, columns, gap = 10, itemsPerPage },
    },
    styleClasses,
  } = props;

  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPage = itemsPerPage ? Math.ceil(items.length / itemsPerPage) : 1;

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

  const getCurrentItems = () => {
    if (itemsPerPage) {
      const currentIndex = currentPage * itemsPerPage;
      return items.slice(currentIndex, currentIndex + itemsPerPage);
    } else {
      return items;
    }
  };

  const getCurrentIndex = () => {
    if (!itemsPerPage) {
      return selectedImageIndex;
    } else {
      return currentPage * itemsPerPage + selectedImageIndex;
    }
  };

  return (
    <>
      <GalleryContainer>
        <GalleryList columns={columns} gap={gap} className={galleryClassName('img-list')}>
          {getCurrentItems().map((item, index) => (
            <GalleryItem
              className={galleryClassName('img-wrapper')}
              key={item.image}
              onClick={() => handleClick(index)}
            >
              <img
                loading="lazy"
                src={dmeConfig.general.imagePath(item.image, 'thumbnail')}
                alt={item.title}
              />
            </GalleryItem>
          ))}
        </GalleryList>
      </GalleryContainer>

      {totalPage > 1 && (
        <PaginationContainer
          className={styleClasses['pagination-container'] || 'dme-w-pagination-container'}
        >
          {(() => {
            const result = [];
            for (let i = 0; i < totalPage; i++) {
              result.push(
                <a
                  href="#"
                  className={
                    (styleClasses['pagination-item'] || 'dme-w-pagination-item') +
                    ' ' +
                    (i === currentPage
                      ? styleClasses['pagination-item-current'] || 'dme-w-pagination-item-current'
                      : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i);
                  }}
                >
                  {i + 1}
                </a>,
              );
            }
            return result;
          })()}
        </PaginationContainer>
      )}

      <Dialog maxWidth={false} open={open} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 100,
          }}
        >
          <CloseOutlined fontSize="large" style={{ color: '#cccccc' }} />
        </IconButton>
        <DialogContent sx={{ padding: 0 }}>
          <GalleryDialog className={galleryClassName('dialog-content')}>
            <IconWrapper onClick={handlePrev}>
              <KeyboardArrowLeft fontSize="large" style={{ color: '#cccccc' }} />
            </IconWrapper>
            {selectedImageIndex !== -1 && (
              <div>
                <img
                  className={GalleryImage + ` ${galleryClassName('dialog-img')}`}
                  src={dmeConfig.general.imagePath(items[getCurrentIndex()]?.image)}
                />
                <ImageIndicator
                  className={styleClasses['gallery-indicator'] || 'dme-w-gallery-indicator'}
                >
                  <span>{getCurrentIndex() + 1}</span>
                  <span> / </span>
                  <span>{items.length}</span>
                </ImageIndicator>
              </div>
            )}
            <IconWrapper isRight onClick={handleNext}>
              <KeyboardArrowRight fontSize="large" style={{ color: '#cccccc' }} />
            </IconWrapper>
          </GalleryDialog>
        </DialogContent>
      </Dialog>
    </>
  );
}
