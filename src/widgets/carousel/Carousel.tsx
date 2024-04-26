import * as React from 'react';
import classNames from 'classnames';
import { TransitionStatus } from 'react-transition-group';

import Transition from '../../core/components/transition';
import { dmeConfig } from '../../core/config';
import { CarouselEntity } from './entity';
import transitionEndListener from './helper';
import useCommittedRef from './hooks/useCommittedRef';
import useEventCallback from './hooks/useEventCallback';
// import useUpdateEffect from './hooks/useUpdateEffect';
import {
  StyledCarouselCaption,
  StyledCarouselImage,
  StyledCarouselIndicatorButton,
  StyledCarouselIndicatorItem,
  StyledCarouselItem,
  StyledCarsouelIndicator,
} from './styled';

type Slide = CarouselEntity['items'][0];

function isVisible(element: unknown | null) {
  if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
    return false;
  }

  const elementStyle = getComputedStyle(element);

  return (
    elementStyle.display !== 'none' &&
    elementStyle.visibility !== 'hidden' &&
    getComputedStyle(element.parentNode).display !== 'none'
  );
}

function forEach<P = any>(children: any, func: (el: React.ReactElement<P>, index: number) => void) {
  let index = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<P>(child)) func(child, index++);
  });
}

const { useMemo, useEffect, useRef, useState, useCallback } = React;
const interval = 5e3;

const Carousel = (props) => {
  const {
    blockNode: {
      data: { items, animation, autoPlay },
    },
    children,
    rootClasses,
    styleClasses,
  } = props;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState('next');

  const onSelect = (index: number, e: any) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    // if (!shouldPlay) return undefined;
    if (nextDirectionRef.current) {
      setDirection(nextDirectionRef.current);
    } else {
    }
    setActiveIndex(activeIndex || 0);
  }, [activeIndex]);
  useEffect(() => {
    if (nextDirectionRef.current) {
      nextDirectionRef.current = null;
    }
  });
  const intervalHandleRef = useRef<number | null>();
  const nextDirectionRef = useRef<string | null>(null);

  const next = useEventCallback((event?) => {
    if (isSliding) {
      return;
    }

    let nextActiveIndex = activeIndex + 1;
    if (nextActiveIndex >= numChildren) {
      nextActiveIndex = 0;
    }

    nextDirectionRef.current = 'next';

    onSelect?.(nextActiveIndex, event);
  });
  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(carouselRef.current)) {
      next();
    }
  });

  let numChildren = items.length;
  let activeChildInterval: number | undefined;
  const activeChildIntervalRef = useCommittedRef(activeChildInterval);
  useEffect(() => {
    if (!autoPlay) {
      return undefined;
    }
    const nextFunc = next;
    intervalHandleRef.current = window.setInterval(
      document.visibilityState ? nextWhenVisible : nextFunc,
      activeChildIntervalRef.current ?? interval ?? undefined,
    );

    return () => {
      if (intervalHandleRef.current !== null) {
        clearInterval(intervalHandleRef.current);
      }
    };
  }, [autoPlay, activeChildInterval]);

  const Image = (slide: Slide, index: number) => (
    <StyledCarouselImage
      className={styleClasses['carousel-image'] || 'dme-carousel-image'}
      src={dmeConfig.general.imagePath(slide.image)}
      alt={`slide${index}`}
    />
  );

  const Content = (slide: Slide, index: number) => {
    return slide.title ? (
      <StyledCarouselCaption>
        <h5>{index}slide</h5>
        <p>{slide.title}</p>
      </StyledCarouselCaption>
    ) : (
      <></>
    );
  };

  const handleEnter = (ele: any) => {
    console.log('handleEnter', ele);
  };
  const handleEntered = (ele: any) => {
    console.log('handleEntered', ele);
  };
  const handleExit = (ele: any) => {
    console.log('handleExit', ele);
  };
  const handleExited = (ele: any) => {
    console.log('handleExited', ele);
  };
  const handleAddEndListener = (node, done) => {
    transitionEndListener(node, done);
  };
  const carouselChildren = items.map((slide: Slide, index: number) => {
    const isActive = index === activeIndex;
    return (
      <Transition
        in={isActive}
        timeout={6000}
        classNames="carousel"
        onEnter={isActive ? handleEnter : undefined}
        onEntered={isActive ? handleEntered : undefined}
        onExit={isActive ? handleExit : undefined}
        onExited={isActive ? handleExited : undefined}
        addEndListener={handleAddEndListener}
      >
        {(status: TransitionStatus, innerProps: any) => {
          return React.cloneElement(
            <StyledCarouselItem
              key={index}
              animation={animation}
              isActive={isActive}
              status={status}
            >
              {Image(slide, index)}
              {Content(slide, index)}
            </StyledCarouselItem>,
            {
              ...innerProps,
              className: classNames(
                styleClasses['carousel-item'] || 'dme-carousel-item',
                animation === 'slide'
                  ? {
                      'carousel-item-next': isActive && status !== 'entered',
                      active: status === 'entered' || status === 'exiting',
                      'carousel-item-start': status === 'entering' || status === 'exiting',
                    }
                  : {},
              ),
            },
          );
        }}
      </Transition>
    );
  });

  const getTransitionChildren = () => {
    return (
      <div className="dme-wrapper-carousel">
        <div className={styleClasses['carousel-inner'] || 'dme-carousel-inner'}>
          {carouselChildren}
        </div>
      </div>
    );
  };

  const getTransitionIndicator = () => {
    return <StyledCarsouelIndicator>{carouselIndicator}</StyledCarsouelIndicator>;
  };
  const indicatorOnClicks = useMemo(
    () =>
      Array.from({ length: numChildren }, (_, index) => (event) => {
        onSelect?.(index, event);
      }),
    [numChildren, onSelect],
  );

  const carouselIndicator = items.map((slide: Slide, index: number) => {
    const isActive = index === activeIndex;
    return (
      <StyledCarouselIndicatorItem active={isActive}>
        <StyledCarouselIndicatorButton
          active={isActive}
          key={index}
          // aria-label={indicatorLabels?.length ? indicatorLabels[index] : `Slide ${index + 1}`}
          // className={isActive ? 'active' : undefined}
          onClick={indicatorOnClicks ? indicatorOnClicks[index] : undefined}
          aria-current={isActive}
        />
      </StyledCarouselIndicatorItem>
    );
  });

  return (
    <div ref={carouselRef} className={rootClasses}>
      {getTransitionIndicator()}
      {getTransitionChildren()}
    </div>
  );
};

export default Carousel;
