import { useEffect, useState } from 'react';
import { MenuItem, Select as MUISelect } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../types';

const Select = (props: DME.SettingComponentProps) => {
  const {
    parameters: { options, defaultValue },
    property,
    value,
    blockPath,
  } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (value: string) => {
    updateBlockPropsByPath(blockPath, property || '', value);
  };

  return (
    <MUISelect
      sx={{
        width: '100px',
        height: '30px',
        fontSize: '14px',
        padding: '0px',
        marginLeft: '4px',
      }}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  );
};

export default Select;
