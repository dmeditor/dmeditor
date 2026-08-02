import { useCallback, useEffect, useState } from 'react';

type PositionType = '' | 'before' | 'after';

const useMousePosition = (
  element: HTMLDivElement | null,
  horizontal?: boolean,
  shownPositionRange: number = 30,
) => {
  const [position, setPosition] = useState<PositionType>('');

  const calculatePosition = useCallback(
    (e: MouseEvent): PositionType => {
      if (!element) return '';

      const { offsetHeight: height, offsetWidth: width } = element;
      const { top: elementY, left: elementX } = element.getBoundingClientRect();
      let result: PositionType = '';

      if (horizontal) {
        let mouseX = e.clientX - elementX;
        if (mouseX < 0) mouseX = 0;
        if (mouseX > width) mouseX = width;

        const judgeWidth = width / 2 > shownPositionRange ? shownPositionRange : width / 2;

        if (mouseX <= judgeWidth) {
          result = 'before';
        } else if (mouseX >= width - judgeWidth) {
          result = 'after';
        } else {
          result = '';
        }
      } else {
        let mouseY = e.clientY - elementY;

        if (mouseY < 0) mouseY = 0;
        if (mouseY > height) mouseY = height;

        const judgeHeight = height / 2 > shownPositionRange ? shownPositionRange : height / 2;
        if (mouseY <= judgeHeight) {
          result = 'before';
        } else if (mouseY >= height - judgeHeight) {
          result = 'after';
        } else {
          result = '';
        }
      }

      return result;
    },
    [element, horizontal, shownPositionRange],
  );

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition(calculatePosition(e));
    },
    [calculatePosition],
  );

  // mouseleave (not mouseout): mouseout bubbles when moving between children
  // and clears the add tool before the pointer can reach it.
  const mouseLeave = useCallback(() => {
    setPosition('');
  }, []);

  useEffect(() => {
    if (element) {
      element.addEventListener('mousemove', mouseMove, false);
      element.addEventListener('mouseleave', mouseLeave, false);
      return () => {
        element.removeEventListener('mousemove', mouseMove);
        element.removeEventListener('mouseleave', mouseLeave);
      };
    }
  }, [element, mouseMove, mouseLeave]);

  return position;
};

export { useMousePosition };
