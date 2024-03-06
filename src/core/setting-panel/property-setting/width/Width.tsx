import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import { Ranger } from 'dmeditor/utils';

const Width = ({ value }: { value: string }) => {
  const [widthType, setWidthType] = React.useState('auto');

  return (
    <>
      <Select
        value={widthType}
        onChange={(e) => {
          const value = e.target.value;
          // selectChange('width', value === 'custom' ? '150px' : value);
        }}
        displayEmpty
        size="small"
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="auto">
          <em>auto</em>
        </MenuItem>
        <MenuItem value="100%">100%</MenuItem>
        <MenuItem value="custom">custom</MenuItem>
      </Select>

      {widthType === 'custom' && (
        <Ranger
          min={50}
          max={800}
          step={5}
          defaultValue={value ? parseFloat(value) : 150}
          onChange={(value) => {
            // rangeChange('width', `${value}px`);
          }}
        />
      )}
    </>
  );
};

export default Width;
