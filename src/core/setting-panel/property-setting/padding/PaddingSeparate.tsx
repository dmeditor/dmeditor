import React, { ChangeEvent, useState } from 'react';
import { InsertLinkOutlined, LinkOffOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  styled,
  TextField,
} from '@mui/material';

import {
  convertedPaddingValue,
  createHandleInputChange,
  createHandleInputKeyDown,
  setChangingValue,
} from './helper';
import { InputManager } from './managers/InputManager';
import {
  PaddingSeparateProps,
  UNDEFINED_VALUE,
  ValidInputValue,
  type PaddingSeparateValue,
} from './types';

const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-thumb': {
    width: 18,
    height: 18,
  },
  '& .MuiSlider-track': {
    height: 2,
  },
  '& .MuiSlider-rail': {
    height: 2,
  },
}));

const PaddingSeparate: React.FC<PaddingSeparateProps> = (props) => {
  const { value, min, max, step, disabled, onChange, onChangePaddingType } = props;
  const [inputManager] = useState(() => new InputManager());
  const [paddingValues, setPaddingValues] = useState<PaddingSeparateValue>({
    top: value,
    bottom: value,
    left: value,
    right: value,
  });

  const [isLinkedTB, setIsLinkedTB] = useState(true);
  const [isLinkedLR, setIsLinkedLR] = useState(true);

  const handleTopChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPaddingValues((prev) => ({ ...prev, top: setChangingValue(value) }));

    if (isLinkedTB) {
      setPaddingValues((prev) => ({
        ...prev,
        bottom: setChangingValue(value),
      }));
    }
  };

  const handleBottomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPaddingValues((prev) => ({
      ...prev,
      bottom: setChangingValue(value),
    }));
  };

  const handleLeftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPaddingValues((prev) => ({ ...prev, left: setChangingValue(value) }));
    if (isLinkedLR) {
      setPaddingValues((prev) => ({
        ...prev,
        right: setChangingValue(value),
      }));
    }
  };

  const handleRightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPaddingValues((prev) => ({ ...prev, right: setChangingValue(value) }));
  };

  const handleSliderChange =
    (key: keyof typeof paddingValues) => (_: Event, value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      setPaddingValues((prev) => {
        const updated = { ...prev, [key]: numValue };
        if (isLinkedTB && (key === 'top' || key === 'bottom')) {
          updated.top = updated.bottom = numValue;
        }
        if (isLinkedLR && (key === 'left' || key === 'right')) {
          updated.left = updated.right = numValue;
        }
        onChange?.(updated);
        return updated;
      });
    };

  const handleInputChange = (key: keyof typeof paddingValues) =>
    createHandleInputChange({
      min,
      max,
      onChange: (value, _) => {
        inputManager.setValue(key, value);
        setPaddingValues((prev) => {
          const updated = { ...prev, [key]: value };
          if (isLinkedTB && (key === 'top' || key === 'bottom')) {
            updated.top = updated.bottom = inputManager.getValue(key);
          }
          if (isLinkedLR && (key === 'left' || key === 'right')) {
            updated.left = updated.right = inputManager.getValue(key);
          }
          onChange?.(updated);
          return updated;
        });
      },
    });

  const handleKeyDown = (key: keyof typeof paddingValues) =>
    createHandleInputKeyDown({
      min,
      max,
      onKeyDown: (value, _) => {
        inputManager.setValue(key, value);
        setPaddingValues((prev) => {
          const updated = { ...prev, [key]: value };
          if (isLinkedTB && (key === 'top' || key === 'bottom')) {
            updated.top = updated.bottom = inputManager.getValue(key);
          }
          if (isLinkedLR && (key === 'left' || key === 'right')) {
            updated.left = updated.right = inputManager.getValue(key);
          }
          onChange?.(updated);
          return updated;
        });
      },
    });
  const customSliderValue = (posPaddingValue: ValidInputValue) => {
    const value = convertedPaddingValue(posPaddingValue, 'slider');
    return value === UNDEFINED_VALUE ? 0 : value;
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs>
                <CustomSlider
                  disabled={disabled}
                  value={customSliderValue(paddingValues.top)}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={min}
                  max={max}
                  onChange={handleSliderChange('top')}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Top"
                  disabled={disabled}
                  value={paddingValues.top}
                  size="small"
                  onBlur={handleInputChange('top')}
                  onChange={handleTopChange}
                  fullWidth
                  InputProps={{
                    onKeyDown: handleKeyDown('top'),
                    inputMode: 'numeric',
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Divider style={{ width: '100%' }}>
                <IconButton onClick={() => setIsLinkedTB(!isLinkedTB)}>
                  {isLinkedTB ? <InsertLinkOutlined /> : <LinkOffOutlined />}
                </IconButton>
              </Divider>
            </Grid>
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs>
                <CustomSlider
                  disabled={disabled}
                  value={customSliderValue(paddingValues.bottom)}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={min}
                  max={max}
                  onChange={handleSliderChange('bottom')}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Bottom"
                  disabled={disabled}
                  value={paddingValues.bottom}
                  size="small"
                  onBlur={handleInputChange('bottom')}
                  onChange={handleBottomChange}
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown('bottom'),
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" mt={4}>
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs>
                <CustomSlider
                  disabled={disabled}
                  value={customSliderValue(paddingValues.left)}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={min}
                  max={max}
                  onChange={handleSliderChange('left')}
                  //   orientation="vertical"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Left"
                  disabled={disabled}
                  value={paddingValues.left}
                  size="small"
                  onBlur={handleInputChange('left')}
                  onChange={handleLeftChange}
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown('left'),
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Divider style={{ width: '100%' }}>
                <IconButton onClick={() => setIsLinkedLR(!isLinkedLR)}>
                  {isLinkedLR ? <InsertLinkOutlined /> : <LinkOffOutlined />}
                </IconButton>
              </Divider>
            </Grid>
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs>
                <CustomSlider
                  disabled={disabled}
                  value={customSliderValue(paddingValues.right)}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={min}
                  max={max}
                  onChange={handleSliderChange('right')}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Right"
                  disabled={disabled}
                  value={paddingValues.right}
                  size="small"
                  onBlur={handleInputChange('right')}
                  onChange={handleRightChange}
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown('right'),
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <InsertLinkOutlined style={{ cursor: 'pointer' }} onClick={onChangePaddingType} />
      </Grid>
    </Grid>
  );
};

export default PaddingSeparate;
