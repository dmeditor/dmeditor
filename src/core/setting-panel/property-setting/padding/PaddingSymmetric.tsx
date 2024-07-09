import React, { ChangeEvent, useState } from 'react';
import { Link, LinkOff, Tune } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import { createHandleInputChange, handleKeyDown } from './helper';

interface PaddingControlProps {
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

const PaddingSymmetric: React.FC<PaddingControlProps> = (props) => {
  const { value, onChangePaddingType, min, max, disabled, onChange } = props;
  const [paddingValues, setPaddingValues] = useState({
    top: value,
    bottom: value,
    left: value,
    right: value,
  });
  const [isLinkedTB, setIsLinkedTB] = useState<boolean>(true);
  const [isLinkedLR, setIsLinkedLR] = useState<boolean>(true);

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
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={10}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              disabled={disabled}
              label="Top"
              value={paddingValues.top}
              onBlur={handleInputChange('top')}
              onChange={handleTopChange}
              size="small"
              placeholder="-"
              InputProps={{
                inputMode: 'numeric',
                onKeyDown: handleKeyDown,
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
            />
            <IconButton onClick={() => setIsLinkedTB(!isLinkedTB)}>
              {isLinkedTB ? <Link /> : <LinkOff />}
            </IconButton>
            <TextField
              label="Bottom"
              value={isLinkedTB ? paddingValues.top : paddingValues.bottom}
              onBlur={handleInputChange('bottom')}
              onChange={handleBottomChange}
              size="small"
              inputProps={{ min: 0 }}
              disabled={isLinkedTB}
              placeholder="-"
              InputProps={{
                inputMode: 'numeric',
                onKeyDown: handleKeyDown,
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
            />
          </Box>

          <Divider style={{ width: '100%' }} />

          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              disabled={disabled}
              label="Left"
              value={paddingValues.left}
              onBlur={handleInputChange('left')}
              onChange={handleLeftChange}
              size="small"
              placeholder="-"
              InputProps={{
                inputMode: 'numeric',
                onKeyDown: handleKeyDown,
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
            />
            <IconButton onClick={() => setIsLinkedLR(!isLinkedLR)}>
              {isLinkedLR ? <Link /> : <LinkOff />}
            </IconButton>
            <TextField
              label="Right"
              value={isLinkedLR ? paddingValues.left : paddingValues.right}
              onBlur={handleInputChange('right')}
              onChange={handleRightChange}
              size="small"
              inputProps={{ min: 0 }}
              placeholder="-"
              disabled={isLinkedLR}
              InputProps={{
                inputMode: 'numeric',
                onKeyDown: handleKeyDown,
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Tune style={{ cursor: 'pointer' }} onClick={onChangePaddingType} />
      </Grid>
    </Grid>
  );
};

export default PaddingSymmetric;
