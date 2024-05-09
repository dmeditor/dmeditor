import * as React from 'react';

import { useEditorStore } from '../../../..';
import { Ranger } from '../../../utils';

const Range = (props: {
  property: string;
  value: number;
  parameters: { min: number; max: number; step?: number };
}) => {
  const { property, parameters, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (value: number) => {
    updateSelectedBlockProps(property, value);
  };

  return (
    <Ranger
      defaultValue={value}
      min={parameters.min === undefined ? 1 : parameters.min}
      max={parameters?.max || 5}
      step={parameters?.step || 1}
      onChange={handleChange}
    ></Ranger>
  );
};

export default Range;
