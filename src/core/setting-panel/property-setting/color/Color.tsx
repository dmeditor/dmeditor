import * as React from 'react';

import { PickColor } from 'Core/utils';
import { useEditorStore } from 'Src/core/main/store';
import { useState } from 'react';

const Color = ( props:{ value?:string, property: string }) => {
  const { property } = props;
  const [value, setValue] = useState(props.value);
  const { updateSelectedBlockProps } = useEditorStore();

  return (
    <PickColor
      color={value ? value : ''}
      onChange={(value) => {
        setValue(value);
        updateSelectedBlockProps(property, value)
      }}
    ></PickColor>
  );
};

export default Color;
