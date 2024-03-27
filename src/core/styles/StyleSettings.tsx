import React from 'react';
import { MenuItem, Select } from '@mui/material';

import { getDef } from '../ToolDefinition';
import { PropertyItem } from '../utils';

export const StyleSettings = (props: {
  blocktype: string;
  styleIdentifier: string;
  onChange: (template: string) => void;
}) => {
  const def = getDef(props.blocktype);

  const styles = def.styles;

  if (!styles) {
    return <></>;
  }

  //get keys sorted by name
  const keys = Object.keys(styles).sort((a: string, b: string) => {
    if (styles[a].name < styles[b].name) {
      return -1;
    } else if (styles[a].name > styles[b].name) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <PropertyItem label="Style">
        <Select
          size="small"
          displayEmpty
          defaultValue={props.styleIdentifier}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {keys.map((identifier, index) => (
            <MenuItem key={index} value={identifier}>
              {styles[identifier].name}
            </MenuItem>
          ))}
        </Select>
      </PropertyItem>
    </div>
  );
};
