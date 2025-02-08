import { useState } from 'react';
import { Grid } from '@mui/material';
import {
  NumberInput,
  TypeNumberInputValue,
} from 'dmeditor/core/utility/settings/number-input/NumberInput';

import { useEditorStore, type DME } from '../../../..';
import { Ranger } from '../../../utils';

const Range = (
  props: DME.SettingComponentProps & {
    property: string;
    value: number;
    parameters: { min: number; max: number; step?: number; showInput?: boolean };
    disabled?: boolean;
  },
) => {
  const { property, parameters, value, blockPath, disabled } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const [inputValue, setInputValue] = useState<TypeNumberInputValue>(value);

  const handleChange = (value?: number) => {
    setInputValue(value || '-');
    updateBlockPropsByPath(blockPath, property, value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Ranger
          disabled={disabled}
          defaultValue={value}
          hideValueLabel={parameters?.showInput}
          min={parameters.min === undefined ? 1 : parameters.min}
          max={parameters?.max || 5}
          step={parameters?.step || 1}
          onChange={handleChange}
        ></Ranger>
      </Grid>
      {parameters.showInput && (
        <Grid item width={60}>
          <NumberInput
            value={inputValue}
            min={parameters.min}
            max={parameters.max}
            onChange={(v, change) => {
              setInputValue(v);
              if (change) {
                if (v === '' || v === '-') {
                  handleChange(undefined);
                } else {
                  handleChange(v);
                }
              }
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Range;
