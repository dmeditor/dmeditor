import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import widgetDefinition, { getWidgetStyle, getWidgetStyles, widgetStyles } from '../components/widgets';
import { PropertyItem } from '../utils/Property';

export const StyleSettings = (props: { blockType: string, values: {[styleIdentifier:string]:string}, onChange:(v:string, style:string)=>void }) => {
  const { blockType, values } = props;

  const styles = Object.keys( getWidgetStyles(blockType) );

  return styles.map((style) => {
    const styleObj = getWidgetStyle(blockType, style);
    if (styleObj.options.length === 0) {
      return <></>;
    }
    return (
      <PropertyItem label={styleObj.name}>
        <Select size="small" value={values[style]||''} onChange={(e)=>props.onChange(e.target.value, style)} displayEmpty>
          <MenuItem value="">None</MenuItem>
          {styleObj.options.map((option) => (
            <MenuItem value={option.identifier}>{option.name}</MenuItem>
          ))}
        </Select>
      </PropertyItem>
    );
  });
};
