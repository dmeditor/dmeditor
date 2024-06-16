import { ReactNode, useEffect, useState } from 'react';
import { debounce } from 'lodash';

type PositionType = '' | 'before' | 'after';

const useMousePosition = (element: HTMLDivElement | null, leftRight?: boolean) => {
  const [position, setPosition] = useState<PositionType>('');

  const height = element?.offsetHeight || 0;
  const width = element?.offsetWidth || 0;
  const elementY = element?.getBoundingClientRect().top || 0;
  const elementX = element?.getBoundingClientRect().left || 0;

  const shownPositionRange = 40; //40px
  const mouseMove = (e: any) => {
    let onFirstHalf = true;
    let result: PositionType = '';
    if (leftRight) {
      const halfWidth = width / 2;
      const mouseX = e.x - elementX;
      //when the element width is too low, use half
      if (halfWidth < shownPositionRange) {
        result = mouseX <= halfWidth ? 'before' : 'after';
      } else {
        //otherwise use range
        if (mouseX <= shownPositionRange) {
          result = 'before';
        } else if (mouseX >= width - shownPositionRange) {
          result = 'after';
        }
      }
    } else {
      const halfHeight = height / 2;
      const mouseY = e.y - elementY;
      onFirstHalf = mouseY < halfHeight;
      if (halfHeight < shownPositionRange) {
        result = mouseY <= halfHeight ? 'before' : 'after';
      } else {
        if (mouseY <= shownPositionRange) {
          result = 'before';
        } else if (mouseY >= height - shownPositionRange) {
          result = 'after';
        }
      }
    }
    setPosition(result);
  };

  const mouseOut = () => {
    setPosition('');
  };

  useEffect(() => {
    if (element) {
      element.addEventListener('mousemove', mouseMove, false);
      element.addEventListener('mouseout', mouseOut, false);
      return () => {
        element?.removeEventListener('mousemove', mouseMove);
        element?.removeEventListener('mouseout', mouseOut);
      };
    }
  });

  return position;
};

export { useMousePosition };
