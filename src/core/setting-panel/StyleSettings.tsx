import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import widgetDefinition, {
  getWidgetStyle,
  getWidgetStyles,
  widgetStyles,
} from '../components/widgets';
import { DME } from '../types';
import { PropertyItem } from '../utils/Property';

export interface StyleSettingProps {
  blockType: string;
  values: { [styleIdentifier: string]: string };
  onChange: (v: string, style: string) => void;
}

const DropDown = (props: StyleSettingProps & { style: DME.WidgetStyle }) => {
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
        <MenuItem value={option.identifier}>{option.name}</MenuItem>
      ))}
    </Select>
  );
};

const ButtonGroup = (props: StyleSettingProps & { style: DME.WidgetStyle }) => {
  const { values, style, onChange } = props;

  return (
    <ToggleButtonGroup
      color="primary"
      value={values[style.identifier]||''}
      exclusive
      size='small'
      onChange={(e) => {props.onChange(e.target.value, style.identifier)}}
    >
      <ToggleButton value=''>None</ToggleButton>     
      {style.options.map((option) => (   
        <ToggleButton value={option.identifier}>{option.name}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const StyleSettings = (props: StyleSettingProps) => {
  const { blockType } = props;

  const styles = Object.keys(getWidgetStyles(blockType));

  return styles.map((style) => {
    const styleObj = getWidgetStyle(blockType, style);
    if (styleObj.options.length === 0) {
      return <></>;
    }
    return (
      <PropertyItem label={styleObj.name}>
        {(!styleObj.display || styleObj.display === 'dropdown') && (
          <DropDown {...props} style={styleObj} />
        )}
        {styleObj.display === 'button-group' && <ButtonGroup {...props} style={styleObj} />}
      </PropertyItem>
    );
  });
};
