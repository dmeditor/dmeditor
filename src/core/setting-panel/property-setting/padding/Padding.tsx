import React, { useState } from 'react';

import { useEditorStore } from '../../../main/store';
import { type DME } from '../../../types';
import { isNumber } from '../../../utils';
import { convertedPaddingSeparateValue, convertedPaddingValue } from './helper';
import PaddingSeparate from './PaddingSeparate';
import PaddingStandard from './PaddingStandard';
import { UNDEFINED_VALUE, type PaddingSeparateValue, type PaddingType } from './types';

// import PaddingSymmetric from './PaddingSymmetric';

const Padding: React.FC<
  DME.SettingComponentProps & {
    value: number | string | null | undefined;
  }
> = (props) => {
  const { value, parameters, blockPath, property, disabled } = props;
  const min = isNumber(parameters?.min) ? parameters?.min : 0;
  const max = isNumber(parameters?.max) ? parameters?.max : 100;
  const step = isNumber(parameters?.step) ? parameters?.step : 1;

  const standardValue = convertedPaddingValue(value);
  const separateValues = Array.isArray(value)
    ? convertedPaddingSeparateValue(value)
    : Array.from({ length: 4 }).fill(standardValue);
  const [paddingType, setPaddingType] = useState<PaddingType>('standard');

  const isAdvancedValue = Array.isArray(value);

  const { updateBlockPropsByPath } = useEditorStore();
  const onChange = (value: number | string | PaddingSeparateValue) => {
    if (!property) {
      return;
    }
    if (typeof value === 'number' || typeof value === 'string') {
      updateBlockPropsByPath(blockPath, property, value === UNDEFINED_VALUE ? undefined : value);
    } else {
      const { top, right, bottom, left } = value;
      if (top === bottom && top === right && top === left) {
        updateBlockPropsByPath(blockPath, property, top === UNDEFINED_VALUE ? undefined : top);
      } else {
        updateBlockPropsByPath(blockPath, property, [
          top === UNDEFINED_VALUE ? undefined : top,
          right === UNDEFINED_VALUE ? undefined : right,
          bottom === UNDEFINED_VALUE ? undefined : bottom,
          left === UNDEFINED_VALUE ? undefined : left,
        ]);
      }
    }
  };

  return (
    <>
      {paddingType === 'standard' && (
        <PaddingStandard
          disabled={disabled}
          value={standardValue}
          min={min}
          max={max}
          isAdvancedValue={isAdvancedValue}
          step={step}
          onChange={onChange}
          onChangePaddingType={() => setPaddingType('separate')}
        />
      )}
      {/* {paddingType === 'symmetric' && (
        <PaddingSymmetric
          disabled={disabled}
          value={currentValue}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          onChangePaddingType={() => setPaddingType('separate')}
        />
      )} */}
      {paddingType === 'separate' && (
        <PaddingSeparate
          disabled={disabled}
          value={{
            ...['top', 'right', 'bottom', 'left'].reduce(
              (acc, cur, idx) => ({ ...acc, [cur]: separateValues[idx] }),
              {},
            ),
          }}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          onChangePaddingType={() => setPaddingType('standard')}
        />
      )}
    </>
  );
};

export default Padding;
