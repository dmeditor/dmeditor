import * as React from 'react';

import { Ranger } from '../../../utils';

const Padding = ({ value }: { value: number }) => {
  return (
    <Ranger
      min={0}
      max={30}
      step={1}
      defaultValue={value ? value : 0}
      onChange={(value) => {
        // rangeChange('padding', value);
        // setSettings({ ...settings, padding: v });
        // setIsChange(true);
      }}
    />
  );
};

export default Padding;
