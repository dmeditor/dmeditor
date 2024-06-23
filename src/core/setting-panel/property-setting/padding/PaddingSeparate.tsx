import React, { ChangeEvent, useRef, useState } from 'react';
import { InsertLinkOutlined, LeakRemove, LinkOffOutlined } from '@mui/icons-material';
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

import { createHandleInputChange, handleKeyDown } from './helper';

const CustomSlider = styled(Slider)(({ theme }) => ({
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

interface PaddingStandardProps {
  defaultValue?: number;
  disabled?: boolean;
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (
    value:
      | number
      | string
      | {
          top: number;
          bottom: number;
          left: number;
          right: number;
        },
    event: any,
  ) => void;
  onChangePaddingType: () => void;
}

const PaddingSeparate: React.FC<PaddingStandardProps> = (props) => {
  const { value, min, max, step, disabled, onChange, onChangePaddingType } = props;
  const handleTopChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setPaddingValues((prev) => ({ ...prev, top: value }));
    if (isLinkedTB) {
      setPaddingValues((prev) => ({ ...prev, bottom: value }));
    }
  };

  const handleBottomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setPaddingValues((prev) => ({ ...prev, bottom: value }));
  };

  const handleLeftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setPaddingValues((prev) => ({ ...prev, left: value }));
    if (isLinkedLR) {
      setPaddingValues((prev) => ({ ...prev, right: value }));
    }
  };

  const handleRightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setPaddingValues((prev) => ({ ...prev, right: value }));
  };

  const [paddingValues, setPaddingValues] = useState({
    top: value,
    bottom: value,
    left: value,
    right: value,
  });
  const [isLinkedTB, setIsLinkedTB] = useState(true);
  const [isLinkedLR, setIsLinkedLR] = useState(true);

  const handleSliderChange =
    (key: keyof typeof paddingValues) => (e: Event, value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      setPaddingValues((prev) => {
        const updated = { ...prev, [key]: numValue };
        if (isLinkedTB && (key === 'top' || key === 'bottom')) {
          updated.top = updated.bottom = numValue;
        }
        if (isLinkedLR && (key === 'left' || key === 'right')) {
          updated.left = updated.right = numValue;
        }
        onChange?.(updated, e);
        return updated;
      });
    };

  const handleInputChange = (key: keyof typeof paddingValues) =>
    createHandleInputChange({
      min,
      max,
      onChange: (value, e) => {
        if (value !== '') {
          setPaddingValues((prev) => {
            const updated = { ...prev, [key]: value };
            if (isLinkedTB && (key === 'top' || key === 'bottom')) {
              updated.top = updated.bottom = value;
            }
            if (isLinkedLR && (key === 'left' || key === 'right')) {
              updated.left = updated.right = value;
            }
            onChange?.(updated, e);
            return updated;
          });
        } else {
          setPaddingValues((prev) => {
            const updated = { ...prev, [key]: undefined };
            if (isLinkedTB && (key === 'top' || key === 'bottom')) {
              updated.top = updated.bottom = undefined;
            }
            if (isLinkedLR && (key === 'left' || key === 'right')) {
              updated.left = updated.right = undefined;
            }
            onChange?.(updated, e);
            return updated;
          });
        }
      },
    });

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs>
                <CustomSlider
                  disabled={disabled}
                  value={paddingValues.top}
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
                  placeholder="-"
                  fullWidth
                  InputProps={{
                    onKeyDown: handleKeyDown,
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
                  value={paddingValues.bottom}
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
                  placeholder="-"
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown,
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
                  value={paddingValues.left}
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
                  placeholder="-"
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown,
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
                  value={paddingValues.right}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={min}
                  max={max}
                  onChange={handleSliderChange('right')}
                  //   orientation="vertical"
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
                  placeholder="-"
                  fullWidth
                  InputProps={{
                    inputMode: 'numeric',
                    onKeyDown: handleKeyDown,
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <LeakRemove style={{ cursor: 'pointer' }} onClick={onChangePaddingType} />
      </Grid>
    </Grid>
  );
};

export default PaddingSeparate;
