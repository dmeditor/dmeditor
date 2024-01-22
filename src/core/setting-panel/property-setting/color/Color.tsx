import * as React from 'react';

import { PickColor } from 'Core/utils';

const Color = ({ value }: { value: string }) => {
  return (
    <PickColor
      color={value ? value : ''}
      onChange={(value) => {
        // pickChange('backgroundColor', value);
      }}
    ></PickColor>
  );
};

export default Color;
