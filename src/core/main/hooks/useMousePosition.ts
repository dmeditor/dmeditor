import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

type PositionType = '' | 'before' | 'after';

const useMousePosition = (element: HTMLDivElement | null, leftRight?: boolean) => {
  const [position, setPosition] = useState<PositionType>('');

  const shownPositionRange = 30; // 30px
  const middleRange = 10; // 10px

  const calculatePosition = (e: MouseEvent) => {
    if (!element) return '';

    const { offsetHeight: height, offsetWidth: width } = element;
    const { top: elementY, left: elementX } = element.getBoundingClientRect();
    let result: PositionType = '';

    if (leftRight) {
      const mouseX = e.clientX - elementX;
      if (mouseX <= shownPositionRange) {
        result = 'before';
      } else if (mouseX >= width - shownPositionRange) {
        result = 'after';
      } else if (mouseX >= width / 2 - middleRange / 2 && mouseX <= width / 2 + middleRange / 2) {
        result = '';
      }
    } else {
      const mouseY = e.clientY - elementY;
      if (mouseY <= shownPositionRange) {
        result = 'before';
      } else if (mouseY >= height - shownPositionRange) {
        result = 'after';
      } else if (mouseY >= height / 2 - middleRange / 2 && mouseY <= height / 2 + middleRange / 2) {
        result = '';
      }
    }

    return result;
  };

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const newPosition = calculatePosition(e);
      setPosition(newPosition);
    },
    [element, leftRight],
  );

  const mouseOut = useCallback(() => {
    setPosition('');
  }, []);

  useEffect(() => {
    if (element) {
      element.addEventListener('mousemove', mouseMove, false);
      element.addEventListener('mouseout', mouseOut, false);
      return () => {
        element.removeEventListener('mousemove', mouseMove);
        element.removeEventListener('mouseout', mouseOut);
      };
    }
  }, [element, mouseMove, mouseOut]);

  return position;
};

export { useMousePosition };
