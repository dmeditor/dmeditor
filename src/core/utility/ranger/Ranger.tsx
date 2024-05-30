import * as React from 'react';
import type { ChangeEvent } from 'react';
import { RestartAltOutlined } from '@mui/icons-material';

import {
  InitialThumb,
  InputContainer,
  RangeContainer,
  ResetButton,
  Scale,
  StyledInput,
  Thumb,
  Track,
} from './styled';

interface RangeProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  disabled?: boolean;
  onChange?: (value: number | undefined) => void;
}
const { useState, useEffect, useRef } = React;

const Range: React.FC<RangeProps> = ({
  min,
  max,
  step,
  initialValue,
  disabled = false,
  onChange,
}) => {
  const [value, setValue] = useState<number | undefined>(initialValue);
  const initialValueRef = useRef<number | undefined>(initialValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const scaleRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value === '' ? undefined : parseInt(event.target.value, 10);
    if (newValue === undefined || (newValue >= min && newValue <= max)) {
      newValue = newValue !== undefined ? Math.round(newValue / step) * step : newValue;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleReset = () => {
    setValue(initialValueRef.current);
    onChange?.(initialValueRef.current);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleDrag(event as unknown as MouseEvent);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    handleDrag(event);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  const handleDrag = (event: MouseEvent | React.MouseEvent) => {
    if (!scaleRef.current) return;
    const rect = scaleRef.current.getBoundingClientRect();
    let newValue = Math.round(((event.clientX - rect.left) / rect.width) * (max - min) + min);
    newValue = Math.round(newValue / step) * step;
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getDisplayValue = (): string | number => {
    if (disabled) {
      return value === undefined ? '-' : value;
    }
    return value !== undefined ? value : '';
  };

  const rangeClass = disabled ? 'range disabled' : 'range';
  const inputClass = disabled ? 'input disabled' : isInputFocused ? 'input focused' : 'input';

  return (
    <RangeContainer className={rangeClass}>
      <Scale ref={scaleRef} onMouseDown={handleMouseDown}>
        <Track />
        <Thumb
          style={{
            left: value !== undefined ? `${((value - min) / (max - min)) * 100}%` : '0%',
          }}
        />
        {initialValueRef.current !== undefined && (
          <InitialThumb
            style={{
              left: `${((initialValueRef.current - min) / (max - min)) * 100}%`,
            }}
          />
        )}
      </Scale>
      <InputContainer>
        <StyledInput
          type="number"
          className={inputClass}
          value={getDisplayValue()}
          onChange={handleChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          step={step}
          disabled={disabled}
        />
        {!disabled && (
          <ResetButton onClick={handleReset}>
            <RestartAltOutlined />
          </ResetButton>
        )}
      </InputContainer>
    </RangeContainer>
  );
};

export default Range;
