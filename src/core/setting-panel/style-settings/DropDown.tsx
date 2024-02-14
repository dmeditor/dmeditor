import { DME } from "Src/core/types/dmeditor";
import { StyleSettingProps } from "./StyleSettings";
import { MenuItem, Select } from "@mui/material";

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
          <MenuItem key={option.identifier} value={option.identifier}>{option.name}</MenuItem>
        ))}
      </Select>
    );
  };
  