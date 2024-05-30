import React, { useMemo, useState } from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import type { DME } from '../../types/dmeditor';
import {
  getWidgetStyle,
  getWidgetStyles,
  widgetDefinition,
  widgetStyles,
} from '../../utils/register';
import { PropertyGroup, PropertyItem } from '../Property';
import { ButtonGroup } from './ButtonGroup';
import { DropDown } from './DropDown';
import { InlineBlock } from './InlineBlock';

export interface StyleSettingProps {
  blockType: string;
  values: { [styleIdentifier: string]: string };
  onChange: (v: string, style: string) => void;
}

export const StyleSettings = (props: StyleSettingProps) => {
  const { blockType } = props;

  const styles = Object.keys(getWidgetStyles(blockType) || {});
  const isCustomStyle = Object.keys(props.values).includes('_');

  const showItem = (styleIdentifier: string) => {
    return !isCustomStyle || (isCustomStyle && styleIdentifier === '_');
  };

  const hasStyle = useMemo(() => {
    for (const style of styles) {
      const styleObj = getWidgetStyle(blockType, style);
      if (styleObj.options.length > 0 && showItem(style)) {
        return true;
      }
    }
    return false;
  }, [blockType]);

  return hasStyle ? (
    <PropertyGroup header="Styles">
      {styles.map((style) => {
        const styleObj = getWidgetStyle(blockType, style);
        if (styleObj.options.length === 0 || !showItem(style)) {
          return <React.Fragment key={styleObj.identifier}></React.Fragment>;
        }

        console.log('wing', props);
        return (
          <PropertyItem label={styleObj.name} key={styleObj.identifier}>
            {(!styleObj.display || styleObj.display === 'inline-block') && (
              <InlineBlock {...props} style={styleObj} />
            )}
            {styleObj.display === 'button-group' && <ButtonGroup {...props} style={styleObj} />}
            {styleObj.display === 'dropdown' && <DropDown {...props} style={styleObj} />}
          </PropertyItem>
        );
      })}
    </PropertyGroup>
  ) : null;
};
