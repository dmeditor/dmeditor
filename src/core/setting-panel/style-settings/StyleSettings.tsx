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
} from '../../components/widgets';
import { DME } from '../../types';
import { PropertyItem } from '../../utils/Property';
import { DropDown } from './DropDown';
import { ButtonGroup } from './ButtonGroup';
import { InlineBlock } from './InlineBlock';
import React from 'react';

export interface StyleSettingProps {
  blockType: string;
  values: { [styleIdentifier: string]: string };
  onChange: (v: string, style: string) => void;
}

export const StyleSettings = (props: StyleSettingProps) => {
  const { blockType } = props;

  const styles = Object.keys(getWidgetStyles(blockType));

  return styles.map((style) => {
    const styleObj = getWidgetStyle(blockType, style);
    if (styleObj.options.length === 0) {
      return <React.Fragment  key={styleObj.identifier}></React.Fragment>;
    }
    return (
      <PropertyItem label={styleObj.name} key={styleObj.identifier}>
        {(!styleObj.display || styleObj.display === 'inline-block') && (
          <InlineBlock {...props} style={styleObj} />
        )}
        {styleObj.display === 'button-group' && <ButtonGroup {...props} style={styleObj} />}
        {styleObj.display === 'dropdown' && <DropDown {...props} style={styleObj} />}
      </PropertyItem>
    );
  });
};
