import * as React from 'react';
import { useEditorStore } from 'dmeditor/main/store';
import { PickColor } from 'dmeditor/utils';

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
