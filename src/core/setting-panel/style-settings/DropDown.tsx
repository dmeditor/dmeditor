import { css } from '@emotion/css';
import { MenuItem, Select } from '@mui/material';

import type { DME } from '../../types';
import { IconDiv, IconImg } from './style';
import { StyleSettingProps } from './StyleSettings';

export const DropDown = (props: StyleSettingProps & { style: DME.WidgetStyle }) => {
  const { values, style } = props;

  return (
    <Select
      size="small"
      value={values[style.identifier] || ''}
      onChange={(e) => props.onChange(e.target.value, style.identifier)}
      displayEmpty
    >
      <MenuItem value="">None</MenuItem>
      {style.options.map((option) => (
        <MenuItem key={option.identifier} value={option.identifier}>
          {option.icon && (
            <IconDiv>
              <IconImg src={option.icon} />
            </IconDiv>
          )}
          <span>{option.name}</span>
        </MenuItem>
      ))}
    </Select>
  );
};
