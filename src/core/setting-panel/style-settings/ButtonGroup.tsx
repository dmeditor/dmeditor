import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { DME } from '../../types';
import { StyleSettingProps } from './StyleSettings';

export const ButtonGroup = (props: StyleSettingProps & { style: DME.WidgetStyle }) => {
  const { values, style, onChange } = props;

  return (
    <ToggleButtonGroup
      color="primary"
      value={values[style.identifier] || ''}
      exclusive
      size="small"
      onChange={(e) => {
        props.onChange(e.target.value, style.identifier);
      }}
    >
      <ToggleButton value="">None</ToggleButton>
      {style.options.map((option) => (
        <ToggleButton value={option.identifier}>{option.name}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
