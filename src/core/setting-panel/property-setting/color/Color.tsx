import * as React from 'react';

import { PickColor } from 'Core/utils';
import { useEditorStore } from 'Src/core/main/store';

const Color = (props: { value?: string; property: string }) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  return (
    <PickColor
      color={value ? value : ''}
      onChange={(value) => {
        updateSelectedBlockProps(property, value);
      }}
    ></PickColor>
  );
};

export default Color;
