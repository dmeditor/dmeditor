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

  const onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 16:
        if (lockAspectRatio != false) {
          setLockAspectRatio(false);
        }
        break;
    }
  };
  const onKeyUP = () => {
    setLockAspectRatio(true);
  };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUP);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', onKeyDown);
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
