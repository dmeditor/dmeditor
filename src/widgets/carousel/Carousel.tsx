import * as React from 'react';
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  ArrowLeftOutlined,
} from '@mui/icons-material';
import classNames from 'classnames';
import { DME } from 'dmeditor/core/types';
import { TransitionStatus } from 'react-transition-group';

import Transition from '../../core/components/transition';
import { dmeConfig } from '../../core/config';
import { CarouselEntity } from './entity';
import transitionEndListener from './helper';
// import useCommittedRef from './hooks/useCommittedRef';
import useEventCallback from './hooks/useEventCallback';
import {
  CarouselArrowButon,
  CarouselArrowContainer,
  StyledCarouselCaption,
  StyledCarouselContainer,
  StyledCarouselImage,
  StyledCarouselIndicatorButton,
  StyledCarouselIndicatorItem,
  StyledCarouselItem,
  StyledCarsouelIndicator,
} from './styled';

const { useMemo, useEffect, useRef, useState, useCallback } = React;
const INTERVAL_TIME = 5000;

const Carousel = ({
  blockNode: {
    data: { items, animation, autoPlay, linkOnImage },
  },
  mode,
  styleClasses,
}: DME.WidgetRenderProps<CarouselEntity>) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const intervalHandleRef = useRef<number | null>(null);
  const nextDirectionRef = useRef<string | null>(null);
  const numChildren = items.length;

  const onSelect = useCallback(
    (index: number) => {
      if (!isSliding) setActiveIndex(index);
    },
    [isSliding],
  );

  const next = useEventCallback(() => {
    if (isSliding) return;

    const nextActiveIndex = (activeIndex + 1) % numChildren;
    nextDirectionRef.current = 'next';
    onSelect(nextActiveIndex);
  });

  const nextClick = useEventCallback(() => {
    const nextActiveIndex = (activeIndex + 1) % numChildren;
    onSelect(nextActiveIndex);
  });

  const previousClick = useEventCallback(() => {
    const nextActiveIndex = (activeIndex === 0 ? numChildren - 1 : activeIndex - 1) % numChildren;
    onSelect(nextActiveIndex);
  });

  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(carouselRef.current)) next();
  });

  useEffect(() => {
    if (!autoPlay || paused) return;

    const nextFunc = document.visibilityState ? nextWhenVisible : next;
    intervalHandleRef.current = window.setInterval(nextFunc, INTERVAL_TIME);

    return () => {
      if (intervalHandleRef.current !== null) clearInterval(intervalHandleRef.current);
    };
  }, [autoPlay, paused, next, nextWhenVisible]);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);

  const carouselChildren = useMemo(() => {
    let touchStart = 0;
    return items.map((slide: Slide, index: number) => {
      const isActive = index === activeIndex;

      return (
        <div
          onTouchStart={(e) => {
            touchStart = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const touchEnd = e.changedTouches[0].clientX;
            if (touchEnd > touchStart + 5) {
              previousClick();
            } else if (touchEnd < touchStart - 5) {
              nextClick();
            }
          }}
        >
          <Transition
            key={index}
            in={isActive}
            timeout={600}
            classNames="carousel"
            addEndListener={transitionEndListener}
          >
            {(status: TransitionStatus) => (
              <StyledCarouselItem
                key={index}
                animation={animation}
                isActive={isActive}
                status={status}
                className={classNames(
                  styleClasses['carousel-item'] || 'dme-carousel-item',
                  animation === 'slide' && {
                    'carousel-item-next': isActive && status !== 'entered',
                    active: status === 'entered' || status === 'exiting',
                    'carousel-item-start': status === 'entering' || status === 'exiting',
                  },
                )}
              >
                {linkOnImage ? (
                  <a href={slide.link}>
                    <StyledCarouselImage
                      className={styleClasses['carousel-image'] || 'dme-carousel-image'}
                      src={dmeConfig.general.imagePath(slide.image)}
                    />
                  </a>
                ) : (
                  <StyledCarouselImage
                    className={styleClasses['carousel-image'] || 'dme-carousel-image'}
                    src={dmeConfig.general.imagePath(slide.image)}
                  />
                )}
                {slide.title && (
                  <StyledCarouselCaption
                    className={styleClasses['carousel-title'] || 'dme-carousel-title'}
                  >
                    {slide.link ? (
                      <a
                        href={slide.link}
                        {...(dmeConfig.widgets.carousel?.newLink ? { target: '_blank' } : {})}
                        className={styleClasses['carousel-title-link'] || 'dme-carousel-title-link'}
                      >
                        {slide.title}
                      </a>
                    ) : (
                      slide.title
                    )}
                  </StyledCarouselCaption>
                )}
              </StyledCarouselItem>
            )}
          </Transition>
        </div>
      );
    });
  }, [items, activeIndex, animation, styleClasses]);

  const carouselIndicators = useMemo(() => {
    return items.map((_, index) => {
      const isActive = index === activeIndex;
      return (
        <StyledCarouselIndicatorItem key={index} active={isActive}>
          <StyledCarouselIndicatorButton
            active={isActive}
            onClick={() => onSelect(index)}
            aria-current={isActive}
          />
        </StyledCarouselIndicatorItem>
      );
    });
  }, [items, activeIndex, onSelect]);

  return (
    <StyledCarouselContainer
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.length > 1 && (
        <>
          <CarouselArrowContainer
            postion="left"
            onClick={() => {
              previousClick();
            }}
          >
            <CarouselArrowButon className={styleClasses['arrow-button'] || 'dme-w-arrow-button'}>
              {styleClasses['arrow-previous'] ? (
                <i className={styleClasses['arrow-previous']} />
              ) : (
                <ArrowBackIosNewOutlined />
              )}
            </CarouselArrowButon>
          </CarouselArrowContainer>
          <CarouselArrowContainer
            postion="right"
            onClick={() => {
              nextClick();
            }}
          >
            <CarouselArrowButon className={styleClasses['arrow-button'] || 'dme-w-arrow-button'}>
              {styleClasses['arrow-next'] ? (
                <i className={styleClasses['arrow-next']} />
              ) : (
                <ArrowForwardIosOutlined />
              )}
            </CarouselArrowButon>
          </CarouselArrowContainer>
          <StyledCarsouelIndicator>{carouselIndicators}</StyledCarsouelIndicator>
        </>
      )}
      <div className={styleClasses['carousel-inner'] || 'dme-carousel-inner'}>
        {carouselChildren}
      </div>
    </StyledCarouselContainer>
  );
};

function isVisible(element: unknown | null) {
  if (!element || !(element instanceof HTMLElement)) return false;
  const elementStyle = getComputedStyle(element);
  return (
    elementStyle.display !== 'none' &&
    elementStyle.visibility !== 'hidden' &&
    getComputedStyle(element.parentNode as HTMLElement).display !== 'none'
  );
}

export default Carousel;
