import { useEffect, useMemo, useState } from 'react';
import { MenuItem, Select as MUISelect } from '@mui/material';
import { getConfigByPath } from 'dmeditor/core/utils';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../types';

const Select = (props: DME.SettingComponentProps) => {
  const {
    parameters: { options, defaultValue, optionsFrom },
    property,
    value,
    blockPath,
  } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const validOptions = useMemo(() => {
    if (optionsFrom) {
      return getConfigByPath(optionsFrom);
    } else {
      return options;
    }
  }, [optionsFrom]);

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
      {validOptions?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  );
};

export default Select;
