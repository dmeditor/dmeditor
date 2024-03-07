import * as React from 'react';
import { Ranger } from 'dmeditor/utils';

const MarginTop = ({ value }: { value: number }) => {
  return (
    <Ranger
      min={0}
      max={100}
      step={5}
      defaultValue={value ? value : 0}
      onChange={(value) => {
        // rangeChange('marginTop', value);
        // setSettings({ ...settings, marginTop: v });
        // setIsChange(true);
      }}
    />
  );
};

export default MarginTop;
