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

  const setValidValue = (newV: string) => {
    if (newV === '' || /\d+/.test(newV)) {
      let previous = v === '' ? 0 : parseInt(v);
      if (newV === '') {
        setV('');
      }
      if (parseInt(newV) >= 0) {
        setV(newV);
      }
      if (parseInt(newV) == previous + 1 || parseInt(newV) == previous - 1) {
        handleChange(newV);
      }
    }
  };

  const handleChange = (v: string) => {
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
        onBlur={() => handleChange(v)}
        onChange={(e) => setValidValue(e.target.value)}
      />
    </>
  );
};

export default Number;
