import React, { useState,useEffect,useRef,SyntheticEvent} from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { SlateFun } from '../utils/Slate'

export const ReactResizable = (props: { children:any,width?: number, height?: number, imageScale?:any, onChange?: (v:any) => void, style?: any,isActive:boolean}) => {
  const [width, setWidth] = useState(props?.width||SlateFun.IMAGE_WIDTH);
  const [height, setHeight] = useState(props?.height || SlateFun.IMAGE_HEIGHT);
  const [imageScale,setImageScale] = useState(props?.imageScale || Math.round(width / height * 100) / 100)
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  
  const onResizeStartFunc = (e: SyntheticEvent<Element, Event>, {element, size, handle}:any) => {
    if (lockAspectRatio) {
      setHeight(Math.round(width / imageScale * 100) / 100) 
    }
  }

  const onResizeStopFunc = (e: SyntheticEvent<Element, Event>, {element, size, handle}:any) => {
    setWidth(size.width)
    setHeight(size.height )
    if (props.onChange) {
      props.onChange(size)
    }
  }

  const onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 16:
        if (lockAspectRatio == true) {
          setLockAspectRatio(false);
        }
        break
    }
  }
  const onKeyUP = () => {
    setLockAspectRatio(true);
  }
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUP);
  useEffect(() => {
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    };
  }, []);
  
  return (
    <ResizableBox className='box hover-handles' style={props.style} width={width} height={height} onResizeStart={onResizeStartFunc} onResizeStop={onResizeStopFunc} lockAspectRatio={lockAspectRatio}  resizeHandles={['sw', 'se', 'nw', 'ne']}>
      {props.children}
    </ResizableBox>
    
   
  )

}