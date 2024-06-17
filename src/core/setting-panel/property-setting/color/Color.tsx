import { useRef, useState } from 'react';
import { Refresh } from '@mui/icons-material';
import { Button, IconButton, Popover } from '@mui/material';
import { SketchPicker } from 'react-color';

import { DME, useEditorStore } from '../../../..';
import { PickColor } from '../../../utils';
import {
  colorFullRing,
  ColorItem,
  colorList,
  ColorModeText,
  ColorPickerItem,
  colorPickerTitle,
  ColorPickerWrapper,
  Divider,
} from './styled';

const PRESET_COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

const SimpleColor = (props: { value?: string; onSelected?: (color: string) => void }) => {
  const { value } = props;
  const presetColors = PRESET_COLORS;

  const handleSelected = (color: string) => {
    props.onSelected?.(color);
  };

  return (
    <ul className={colorList} style={{ marginTop: 8 }}>
      {presetColors.map((color, index) => {
        return (
          <ColorItem
            key={index}
            style={{ background: color }}
            selected={value === color}
            onClick={() => handleSelected(color)}
          />
        );
      })}
    </ul>
  );
};

const AdvancedColor = (props: { value?: string; onChange?: (color: string) => void }) => {
  const { value = '', onChange } = props;

  const handleChange = (color: any) => {
    onChange?.(color.hex);
  };

  return (
    <SketchPicker
      color={value}
      presetColors={[]}
      onChangeComplete={handleChange}
      styles={{
        default: {
          picker: {
            width: 300,
            padding: 0,
            boxShadow: 'none',
          },
        },
      }}
    />
  );
};

const RecentColor = (props: {
  value?: string;
  onChange?: (color: string) => void;
  recentColors?: string[];
}) => {
  const { value, recentColors = [] } = props;

  if (recentColors.length === 0) {
    return null;
  }

  const handleSelected = (color: string) => {
    props.onChange?.(color);
  };

  return (
    <>
      <p>Recent</p>
      <ul className={colorList}>
        {recentColors.map((color, index) => {
          return (
            <ColorItem
              key={index}
              style={{ background: color }}
              selected={value === color}
              onClick={() => handleSelected(color)}
            />
          );
        })}
      </ul>
    </>
  );
};

const ColorPicker = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath, getRecentColors, updateRecentColors } = useEditorStore();
  const projectColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 'transparent'];
  const colorPickerRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
  const [localValue, setLocalValue] = useState<string | undefined>(value);
  const recentColors = getRecentColors();

  const handleClose = () => {
    setOpen(false);
    setLocalValue(value);

    if (value) {
      updateRecentColors(value);
    }
  };

  const handleReset = () => {
    updateBlockPropsByPath(blockPath, property, localValue);
  };

  return (
    <ul className={colorList}>
      <ColorPickerItem
        style={{ background: value ?? 'transparent' }}
        selected
        transparent={!value}
      />
      {projectColors.map((color, index) => {
        return (
          <ColorPickerItem
            key={index}
            style={{ background: color }}
            onClick={() => {
              updateBlockPropsByPath(blockPath, property, color);
            }}
            transparent={color === 'transparent'}
          />
        );
      })}
      <li className={colorFullRing} ref={colorPickerRef} onClick={() => setOpen(true)} />
      <Popover
        open={open}
        anchorEl={colorPickerRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        <ColorPickerWrapper>
          <div className={colorPickerTitle}>
            <ColorModeText active={mode === 'simple'} onClick={() => setMode('simple')}>
              Simple
            </ColorModeText>
            <Divider />
            <ColorModeText active={mode === 'advanced'} onClick={() => setMode('advanced')}>
              Advanced
            </ColorModeText>
            <IconButton onClick={handleReset} style={{ marginLeft: 'auto' }}>
              <Refresh />
            </IconButton>
          </div>
          {mode === 'simple' ? (
            <SimpleColor
              value={value}
              onSelected={(color) => {
                updateBlockPropsByPath(blockPath, property, color);
              }}
            />
          ) : (
            <AdvancedColor
              value={value}
              onChange={(color) => {
                updateBlockPropsByPath(blockPath, property, color);
              }}
            />
          )}
          <RecentColor
            recentColors={recentColors}
            value={value}
            onChange={(color) => {
              updateBlockPropsByPath(blockPath, property, color);
            }}
          />
        </ColorPickerWrapper>
      </Popover>
    </ul>
  );
};

const Color = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  return (
    <PickColor
      color={value ? value : ''}
      onChange={(value) => {
        updateBlockPropsByPath(blockPath, property, value);
      }}
    ></PickColor>
  );
};

export default ColorPicker;
