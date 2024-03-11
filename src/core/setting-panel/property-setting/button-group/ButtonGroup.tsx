import { Button, ButtonGroup as MUIButtonGroup } from '@mui/material';
import * as React from 'react';

import { useEditorStore } from 'Src/core/main/store';
import { Ranger } from 'Src/core/utils/Ranger';

const ButtonGroup = (props: {
  property: string;
  value: string;
  parameters: {options: Array<{text:string, value:string}> };
}) => {
  const { property, parameters, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (value: string) => {
    updateSelectedBlockProps(property, value);
  };

  return (
    <MUIButtonGroup variant="outlined" size='small'>
        {parameters.options.map((item)=><Button variant={props.value===item.value?'contained':'outlined'} onClick={()=>handleChange(item.value)}>{item.text}</Button>)}        
    </MUIButtonGroup>
  );
};

export default ButtonGroup;
