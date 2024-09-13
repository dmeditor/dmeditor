import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

type PositionType = '' | 'before' | 'after';

const useMousePosition = (
  element: HTMLDivElement | null,
  horizontal?: boolean,
  shownPositionRange: number = 30,
) => {
  const [position, setPosition] = useState<PositionType>('');

  const calculatePosition = (e: MouseEvent): PositionType => {
    if (!element) return '';

    const { offsetHeight: height, offsetWidth: width } = element;
    const { top: elementY, left: elementX } = element.getBoundingClientRect();
    let result: PositionType = '';

    if (horizontal) {
      let mouseX = e.clientX - elementX;
      if (mouseX < 0) mouseX = 0;
      if (mouseX > width) mouseX = width;

      if (mouseX <= shownPositionRange) {
        result = 'before';
      } else if (mouseX >= width - shownPositionRange) {
        result = 'after';
      } else {
        result = '';
      }
    } else {
      let mouseY = e.clientY - elementY;

      if (mouseY < 0) mouseY = 0;
      if (mouseY > height) mouseY = height;

      if (mouseY <= shownPositionRange) {
        result = 'before';
      } else if (mouseY >= height - shownPositionRange) {
        result = 'after';
      } else {
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
    [element, horizontal],
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
