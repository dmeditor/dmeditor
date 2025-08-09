import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CloseOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { DME } from 'dmeditor/core/types';
import { partial } from 'lodash';

import { dmeConfig } from '../../core/config';
import { GalleryEntity } from './entity';
import {
  Caption,
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

  const handleNext = useCallback(() => {
    setSelectedImageIndex((index) => (index + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      console.log('hello');
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    },
    [handlePrev, handleNext],
  );

  const handleClick = (index: number) => {
    setOpen(true);

    if (!itemsPerPage) {
      setSelectedImageIndex(index);
    } else {
      setSelectedImageIndex(currentPage * itemsPerPage + index);
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      console.log('remove keydown');
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const handleClose = (_evt: React.SyntheticEvent, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const getCurrentItems = () => {
    if (itemsPerPage) {
      const currentIndex = currentPage * itemsPerPage;
      return items.slice(currentIndex, currentIndex + itemsPerPage);
    } else {
      return items;
    }
  };

  let touchStart = 0;
  const [touchMoveX, setTouchMoveX] = useState(0);

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
              {item.title && (
                <Caption className={styleClasses['caption'] || 'dme-w-caption'}>
                  {item.title}
                </Caption>
              )}
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
          <GalleryDialog
            onTouchStart={(e) => {
              touchStart = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              if (touchStart) {
                const moveX = e.touches[0].clientX - touchStart;
                setTouchMoveX(moveX);
              }
            }}
            onTouchEnd={(e) => {
              const touchEnd = e.changedTouches[0].clientX;
              if (touchEnd > touchStart + 5) {
                handleNext();
                setTouchMoveX(0);
              } else if (touchEnd < touchStart - 5) {
                handlePrev();
                setTouchMoveX(0);
              }
              touchStart = 0;
            }}
            className={galleryClassName('dialog-content')}
          >
            <IconWrapper onClick={handlePrev}>
              <KeyboardArrowLeft fontSize="large" style={{ color: '#cccccc' }} />
            </IconWrapper>
            {selectedImageIndex !== -1 && (
              <div style={{ overflow: 'hidden' }}>
                <img
                  style={{
                    transform:
                      'scale(' +
                      (touchMoveX && touchMoveX < 100 ? 1 + Math.abs(touchMoveX) / 100 : 1) +
                      ')',
                  }}
                  className={GalleryImage + ` ${galleryClassName('dialog-img')}`}
                  src={dmeConfig.general.imagePath(items[selectedImageIndex]?.image)}
                />
                {items[selectedImageIndex].title && (
                  <Caption className={styleClasses['popup-caption'] || 'dme-w-popup-caption'}>
                    {items[selectedImageIndex].title}
                  </Caption>
                )}
                <ImageIndicator
                  className={styleClasses['gallery-indicator'] || 'dme-w-gallery-indicator'}
                >
                  <span>{selectedImageIndex + 1}</span>
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
