import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Refresh } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import { SketchPicker, type ColorResult } from 'react-color';

import { DME, useEditorStore } from '../..';
import { CustomSlider } from './Ranger';

// 10 columns
const PRESET_COLORS = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#b7b7b7',
  '#cccccc',
  '#d9d9d9',
  '#efefef',
  '#f3f3f3',
  '#ffffff',
  '#980000',
  '#ff0000',
  '#ff9900',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#4a86e8',
  '#0000ff',
  '#9900ff',
  '#ff00ff',
  '#e6b8af',
  '#f4cccc',
  '#fce5cd',
  '#fff2cc',
  '#d9ead3',
  '#d0e0e3',
  '#c9daf8',
  '#cfe2f3',
  '#d9d2e9',
  '#ead1dc',
  '#dd7e6b',
  '#ea9999',
  '#f9cb9c',
  '#ffe599',
  '#b6d7a8',
  '#a2c4c9',
  '#a4c2f4',
  '#9fc5e8',
  '#b4a7d6',
  '#d5a6bd',
  '#cc4125',
  '#e06666',
  '#f6b26b',
  '#ffd966',
  '#93c47d',
  '#76a5af',
  '#6d9eeb',
  '#6fa8dc',
  '#8e7cc3',
  '#c27ba0',
  '#a61c00',
  '#cc0000',
  '#e69138',
  '#f1c232',
  '#6aa84f',
  '#45818e',
  '#3c78d8',
  '#3d85c6',
  '#674ea7',
  '#a64d79',
  '#85200c',
  '#990000',
  '#b45f06',
  '#bf9000',
  '#38761d',
  '#134f5c',
  '#1155cc',
  '#0b5394',
  '#351c75',
  '#741b47',
  '#5b0f00',
  '#660000',
  '#783f04',
  '#7f6000',
  '#274e13',
  '#0c343d',
  '#1c4587',
  '#073763',
  '#20124d',
  '#4c1130',
];

const colorList = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const Divider = styled.div`
  border-left: 1px solid #ccc;
  height: 20px;
  margin: 0 10px;
`;

const ColorItem = styled.span<{ selected?: boolean }>`
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.25);
    border-color: #999999;
  }

  position: relative;
  display: inline-block;
  margin: 1.5px;
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
  padding: 14px;
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

const OpacityLabel = styled.div`
  margin-top: 12px;
  font-size: 12px;
`;

const OpacityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OpacityInput = styled.input`
  width: 32px;
  flex: none;
  box-sizing: border-box;
  padding: 4px 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const parseColor = (value?: string): { hex: string; alpha: number } => {
  const match = value?.trim().match(/^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/);
  if (!match) {
    return { hex: value || '#000000', alpha: 1 };
  }
  const alpha = match[2] ? Math.round((parseInt(match[2], 16) / 255) * 100) / 100 : 1;
  return { hex: '#' + match[1].toLowerCase(), alpha };
};

const formatColor = (hex: string, alpha: number) => {
  const match = hex.match(/^#([0-9a-fA-F]{6})/);
  if (!match) {
    return hex;
  }
  const base = '#' + match[1].toLowerCase();
  const byte = Math.round(Math.min(1, Math.max(0, alpha)) * 255);
  if (byte >= 255) {
    return base;
  }
  return base + byte.toString(16).padStart(2, '0');
};

const formatAlpha = (alpha: number) => String(Math.round(alpha * 100) / 100);

const SimpleColor = (props: { value?: string; onSelected?: (color: string) => void }) => {
  const { value } = props;
  const presetColors = PRESET_COLORS;

  const handleSelected = (color: string) => {
    props.onSelected?.(color);
  };

  return (
    <div className={colorList}>
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
    </div>
  );
};

const AdvancedColor = (props: { value?: string; onChange?: (color: string) => void }) => {
  const { value = '', onChange } = props;

  const handleChange = (color: ColorResult) => {
    onChange?.(color.hex);
  };

  return (
    <SketchPicker
      color={value}
      disableAlpha
      presetColors={[]}
      onChange={handleChange}
      styles={{
        default: {
          picker: {
            width: 240,
            padding: 0,
            boxShadow: 'none',
          },
        },
      }}
    />
  );
};

const OpacityControl = (props: { alpha: number; onChange: (alpha: number) => void }) => {
  const alpha = Math.min(1, Math.max(0, props.alpha));
  const [text, setText] = useState(formatAlpha(alpha));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) {
      setText(formatAlpha(alpha));
    }
  }, [alpha]);

  const commit = (raw: string) => {
    if (raw.trim() === '' || raw === '.' || raw.endsWith('.')) {
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n)) {
      return;
    }
    props.onChange(Math.min(1, Math.max(0, Math.round(n * 100) / 100)));
  };

  return (
    <div>
      <OpacityLabel>Opacity</OpacityLabel>
      <OpacityRow>
        <CustomSlider
          size="small"
          min={0}
          max={1}
          step={0.01}
          value={alpha}
          onChange={(_, value) => props.onChange(value as number)}
          sx={{ flex: 1, py: 1 }}
        />
        <OpacityInput
          type="number"
          min={0}
          max={1}
          step={0.01}
          value={text}
          onFocus={() => {
            focused.current = true;
          }}
          onChange={(e) => {
            setText(e.target.value);
            commit(e.target.value);
          }}
          onBlur={() => {
            focused.current = false;
            const n = Number(text);
            if (text.trim() === '' || Number.isNaN(n)) {
              setText(formatAlpha(alpha));
              return;
            }
            const next = Math.min(1, Math.max(0, Math.round(n * 100) / 100));
            setText(formatAlpha(next));
            props.onChange(next);
          }}
        />
      </OpacityRow>
    </div>
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
      <div style={{ marginTop: 10 }}>Recent</div>
      <div className={colorList} style={{ marginTop: 10 }}>
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
      </div>
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

  const parsed = color ? parseColor(color) : undefined;
  const alpha = parsed?.alpha ?? 1;
  const baseHex = parsed?.hex;

  const handleChange = (nextHex: string) => {
    onChange?.(formatColor(nextHex, alpha));
  };

  const handleRecent = (nextColor: string) => {
    onChange?.(nextColor);
  };

  const handleAlpha = (nextAlpha: number) => {
    onChange?.(formatColor(baseHex || '#000000', nextAlpha));
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
            <SimpleColor value={baseHex} onSelected={handleChange} />
          ) : (
            <AdvancedColor value={baseHex} onChange={handleChange} />
          )}
          <OpacityControl alpha={alpha} onChange={handleAlpha} />
          <RecentColor recentColors={recentColors} value={color} onChange={handleRecent} />
        </ColorPickerWrapper>
      </Popover>
    </>
  );
};
