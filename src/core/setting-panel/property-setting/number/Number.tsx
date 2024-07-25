import { useState } from 'react';
import { TextField } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../..';

const Number = (props: DME.SettingComponentProps) => {
  const { property, value, parameters, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const [v, setV] = useState<string>(value === undefined ? '' : value + '');

  const getMinMax = () => {
    let minMax: { min?: number; max?: number } = {};
    if (parameters) {
      if (parameters['min'] !== undefined) {
        minMax['min'] = parameters['min'] as number;
      }
      if (parameters['max'] !== undefined) {
        minMax['max'] = parameters['max'] as number;
      }
    }
    return minMax;
  };

  const setValidValue = (v: string) => {
    if (v === '') {
      setV('');
    }
    if (/\d+/.test(v)) {
      if (parseInt(v) >= 0) {
        setV(v);
      }
    }
  };

  const handleChange = () => {
    if (v === '') {
      updateBlockPropsByPath(blockPath, property!, undefined);
    } else {
      const vInt = parseInt(v);
      updateBlockPropsByPath(blockPath, property!, vInt);
    }
  };

  return (
    <>
      <TextField
        style={{ width: 80 }}
        size="small"
        InputProps={{ inputProps: getMinMax() }}
        type="number"
        value={v || ''}
        onBlur={handleChange}
        onChange={(e) => setValidValue(e.target.value)}
      />
    </>
  );
};

export default Number;
