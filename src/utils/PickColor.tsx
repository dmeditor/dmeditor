import { SketchPicker } from 'react-color';
import { useEffect, useRef, useState } from "react";
export const PickColor=(props:any)=>{
  const [showColorPicker, setShowColorPicker] = useState(false);
  const modalRef= useRef(null);
  let originalColor:string = '';
  const changeColor = (color: any)=>{
      if(originalColor===''){
          originalColor = props.color?props.color:'';
      }
      console.log(color)
      change(color.hex)
  }
  const change = (colorV:any)=>{
      if( props.onChange ){
          props.onChange(colorV);   
      }
  }
  const resetColor = ()=>{
    change(originalColor) 
    setShowColorPicker(false);       
  }
  useEffect(() => {
    function handler(event: Event) {
      const current = modalRef.current as any
      if (!current || !current.contains(event.target)) {
        setShowColorPicker(false);  
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
    return (
      <>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowColorPicker(!showColorPicker);
          }}
          style={{
            display: "inline-block",
            border: "1px solid #cccccc",
            cursor: "pointer",
            width: "30px",
            height: "30px",
            borderRadius: 20,
            background: props.color,
          }}
        ></span>
        {showColorPicker && (
          <div
            ref={modalRef}
            style={{ position: "absolute", right: 0, zIndex: 100 }}
          >
            <SketchPicker
              presetColors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#795548",
                "#607d8b",
              ]}
              color={props.color ? props.color : "#F5FFE3"}
              disableAlpha={true}
              onChange={changeColor}
            />
            <div style={{padding:5}}><a href='javascript:void(0)' onClick={resetColor}>Reset</a></div>
          </div>
        )}
      </>
    );
}