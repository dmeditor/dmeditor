import * as React from 'react';

import { useEditorStore } from 'Src/core/main/store';
import { Ranger } from 'Src/core/utils/Ranger';

const { useState, useEffect } = React;
const Range = (props: {
  property: string;
  value: number;
  parameters: { min: number; max: number };
}) => {
  const { property, parameters, value } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (value: number) => {
    setCurrentValue(value);
  };

  useEffect(() => {
    updateSelectedBlockProps(property, currentValue);
  }, [currentValue]);

  return (
    <Ranger
      defaultValue={currentValue}
      min={parameters?.min || 1}
      max={parameters?.max || 5}
      step={10}
      onChange={handleChange}
    ></Ranger>
  );
};

export default Range;
