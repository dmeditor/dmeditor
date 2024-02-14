import { MenuItem, Select } from '@mui/material';

import { InlineBlockItemStyle, InlineBlockStyle } from './style';
import { StyleSettingProps } from './StyleSettings';
import { DME } from 'Src/core/types/dmeditor';

export const InlineBlock = (props: StyleSettingProps & { style: DME.WidgetStyle }) => {
  const { values, style } = props;

  const value = values[style.identifier] || '';
  const handleChange = (v:string) => {
    if(v!=value){
        props.onChange(v, style.identifier);
    }
  };

  return (
    <InlineBlockStyle>
      <InlineBlockItemStyle selected={!value} onClick={() => handleChange('')}>
        None
      </InlineBlockItemStyle>
      {style.options.map((option) => (
        <InlineBlockItemStyle
          selected={values[style.identifier] === option.identifier}
          onClick={() => handleChange(option.identifier)}
          key={option.identifier}
        >
          {option.name}
        </InlineBlockItemStyle>
      ))}
    </InlineBlockStyle>
  );
};
