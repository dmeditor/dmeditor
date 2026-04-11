import React, { CSSProperties, SyntheticEvent, useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';

const Resizable = (props: {
  children: React.ReactNode;
  width: number;
  height: number;
  className?: string;
  onChange?: (value: { width: number; height: number }) => void;
  style?: CSSProperties;
  isActive: boolean;
}) => {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const onResizeStopFunc = (e: SyntheticEvent<Element, Event>, { element, size, handle }: any) => {
    setWidth(size.width);
    setHeight(size.height);
    if (props.onChange) {
      props.onChange(size);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 16) {
        setLockAspectRatio(false);
      }
    };
    const onKeyUp = () => {
      setLockAspectRatio(true);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <ResizableBox
      className="box hover-handles"
      style={props.style}
      width={width}
      height={height}
      onResizeStop={onResizeStopFunc}
      lockAspectRatio={lockAspectRatio}
      resizeHandles={['sw', 'se', 'nw', 'ne']}
    >
      {props.children}
    </ResizableBox>
  );
};

export default Resizable;
