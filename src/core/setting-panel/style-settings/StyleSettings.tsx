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
  getValidStyles,
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
  enabledStyles?: { [styleIdentifier: string]: Array<string> };
  values: { [styleIdentifier: string]: string };
  onChange: (optionIdentifier: string, styleIdentifier: string) => void;
}

export const StyleSettings = (props: StyleSettingProps) => {
  const { blockType, enabledStyles } = props;

  const styles = Object.keys(getValidStyles(blockType));

  const isCustomStyle = Object.keys(props.values).includes('_');

  if (styles.length === 0 || (enabledStyles && Object.keys(enabledStyles).length === 0)) {
    return <></>;
  }

  return (
    <PropertyGroup header="Styles">
      {styles.map((style) => {
        let styleObj = getWidgetStyle(blockType, style);

        if (isCustomStyle && style !== '_') {
          return <React.Fragment key={styleObj.identifier}></React.Fragment>;
        }

        if (enabledStyles) {
          if (enabledStyles[styleObj.identifier]) {
            const enabledOptions = enabledStyles[styleObj.identifier];
            const options = styleObj.options.filter((option) =>
              enabledOptions.includes(option.identifier),
            );
            styleObj = { ...styleObj, options: options };
          } else {
            return <React.Fragment key={styleObj.identifier}></React.Fragment>;
          }
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
      })}
    </PropertyGroup>
  );
};
