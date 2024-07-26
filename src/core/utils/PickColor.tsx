import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Refresh } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import { SketchPicker, type ColorResult } from 'react-color';

import { DME, useEditorStore } from '../..';

// 8 columns
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
  '#ffffff',
  '#cccccc',
  '#999999',
  '#666666',
  '#333333',
  '#000000',
];

const colorList = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Divider = styled.div`
  border-left: 1px solid #ccc;
  height: 20px;
  margin: 0 10px;
`;

const ColorItem = styled.li<{ selected?: boolean }>`
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.25);
    border-color: #999999;
  }

  position: relative;
  display: inline-block;
  margin: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 0.5px solid #cccccc;

  &::before {
    content: ' ';
    display: ${(props) => (props.selected ? 'inline-block' : 'none')};
    width: 50%;
    height: 20%;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(-50%, -60%) rotate(-45deg);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const ColorPickerContainer = styled.div<{
  width?: number;
  displaySelectedColor?: boolean;
  color?: string;
}>`
  --width: ${(props) => props.width ?? 22}px;
  display: inline-block;
  width: var(--width);
  height: var(--width);
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) =>
    props.displaySelectedColor && props.color
      ? props.color
      : 'conic-gradient(#f00, #f90, #ff0, #0f0, #0ff, #00f, #90f, #f00)'};
  mask: ${(props) =>
    props.displaySelectedColor && props.color
      ? 'none'
      : 'radial-gradient(circle, transparent 40%, white 41%)'};
`;

const ColorPickerWrapper = styled.div`
  position: relative;
  padding: 16px;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ColorModeText = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? '#000' : '#ccc')};
  cursor: pointer;
`;

const colorPickerTitle = css`
  display: flex;
  align-items: center;
  padding: 5px;
`;

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

  const handleChange = (color: ColorResult) => {
    let hex = color.hex;
    if (color.rgb.a && color.rgb.a !== 1) {
      let end = Math.round(color.rgb.a * 255).toString(16);
      if (end.length === 1) {
        end = '0' + end;
      }
      hex = hex + end;
    }
    onChange?.(hex);
  };

  return (
    <SketchPicker
      color={value}
      presetColors={[]}
      onChange={handleChange}
      styles={{
        default: {
          picker: {
            width: 220,
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
  const { recentColors = [], value } = props;

  const isMatched = useMemo(() => {
    return PRESET_COLORS.includes(value ?? '');
  }, [value]);

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
              title={color}
              style={{ background: color }}
              selected={!isMatched && value === color}
              onClick={() => handleSelected(color)}
            />
          );
        })}
      </ul>
    </>
  );
};

export const useRecentColors = () => {
  const { getRecentColors, updateRecentColors } = useEditorStore();
  const recentColors = getRecentColors();

  const handleUpdateRecentColors = (color?: string) => {
    if (color) {
      updateRecentColors(color);
    }
  };

  return { recentColors, handleUpdateRecentColors };
};

export const PickColor = (props: {
  color: string | undefined;
  displaySelectedColor?: boolean;
  width?: number;
  recentColors?: string[];
  onChange?: (color?: string) => void;
  onChangeComplete?: (color?: string) => void;
  title?: string;
}) => {
  const {
    color,
    recentColors = [],
    onChange,
    onChangeComplete,
    displaySelectedColor = true,
    title,
  } = props;

  const [localValue, setLocalValue] = useState<string | undefined>(color);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
    setLocalValue(color);
    onChangeComplete?.(color);
  };

  const handleReset = () => {
    onChange?.(localValue);
  };

  const handleChange = (color: string) => {
    onChange?.(color);
  };

  return (
    <>
      <Tooltip title={title}>
        <ColorPickerContainer
          ref={colorPickerRef}
          width={props.width}
          color={color}
          displaySelectedColor={displaySelectedColor}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
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
            <SimpleColor value={color} onSelected={handleChange} />
          ) : (
            <AdvancedColor value={color} onChange={handleChange} />
          )}
          <RecentColor recentColors={recentColors} value={color} onChange={handleChange} />
        </ColorPickerWrapper>
      </Popover>
    </>
  );
};
