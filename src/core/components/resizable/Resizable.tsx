import React, { CSSProperties, SyntheticEvent, useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';

const Resizable = (props: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  scale?: any;
  className?: string;
  onChange?: (value: any) => void;
  style?: CSSProperties;
  isActive: boolean;
}) => {
  const [width, setWidth] = useState(props?.width || 300);
  const [height, setHeight] = useState(props?.height || 168);
  const [imageScale, setImageScale] = useState(
    props?.scale || Math.round((width / height) * 100) / 100,
  );

  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const onResizeStartFunc = (e: SyntheticEvent<Element, Event>, { element, size, handle }: any) => {
    if (lockAspectRatio) {
      setHeight(Math.round((width / imageScale) * 100) / 100);
    }
  };

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
      onResizeStart={onResizeStartFunc}
      onResizeStop={onResizeStopFunc}
      lockAspectRatio={lockAspectRatio}
      resizeHandles={['sw', 'se', 'nw', 'ne']}
    >
      {props.children}
    </ResizableBox>
  );
};

export default Resizable;
