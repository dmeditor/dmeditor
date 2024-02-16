import { debounce } from 'lodash';
import { useState, useEffect, ReactNode } from 'react';

type PositionType = ''|'before'|'after';

const useMousePosition = (element: HTMLDivElement|null)=>{

    const [position, setPosition] = useState<PositionType>('');    

    const height = element?.offsetHeight||0;
    const elementY = element?.getBoundingClientRect().top||0;

    const mouseMove = (e:any)=>{
        const halfHeight = height/2;
        const mouseHeight = e.y-elementY;
        setPosition(mouseHeight<halfHeight?'before':'after');
    }

    const mouseOut = ()=>{
        setPosition('');
    }

    useEffect(()=>{
        if(element){
            element.addEventListener('mousemove', mouseMove, false)
            element.addEventListener('mouseout', mouseOut, false)            
            return ()=>{
                element?.removeEventListener('mousemove', mouseMove);
                element?.removeEventListener('mouseout', mouseOut) 
            }
        }
        
    });

    return position;
}

export {useMousePosition};