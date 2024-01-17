import * as React from 'react';

import { PickColor } from 'Core/utils';

const Color = ({ value }: { value: string }) => {
  <PickColor
    color={value ? value : '#000000'}
    onChange={(value) => {
      // pickChange('color', value);
    }}
  ></PickColor>;
};

export default Color;
