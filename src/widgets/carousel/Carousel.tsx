import * as React from 'react';
import classNames from 'classnames';
import { TransitionStatus } from 'react-transition-group';

import Transition from '../../core/components/transition';
import { dmeConfig } from '../../core/config';
import { CarouselEntity } from './entity';
import transitionEndListener from './helper';
// import useCommittedRef from './hooks/useCommittedRef';
import useEventCallback from './hooks/useEventCallback';
import {
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
    data: { items, animation, autoPlay },
  },
  styleClasses,
}) => {
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
    return items.map((slide: Slide, index: number) => {
      const isActive = index === activeIndex;

      return (
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
              <StyledCarouselImage
                className={styleClasses['carousel-image'] || 'dme-carousel-image'}
                src={dmeConfig.general.imagePath(slide.image)}
              />
              {slide.title && (
                <StyledCarouselCaption>
                  <h5>{index} slide</h5>
                  <p>{slide.title}</p>
                </StyledCarouselCaption>
              )}
            </StyledCarouselItem>
          )}
        </Transition>
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
      <StyledCarsouelIndicator>{carouselIndicators}</StyledCarsouelIndicator>
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
