import React, { useState } from 'react';

import { useEditorStore } from '../../../main/store';
import { type DME } from '../../../types';
import { isNumber } from '../../../utils';
import { convertedPaddingValue } from './helper';
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

  const currentValue = convertedPaddingValue(value);
  const [paddingType, setPaddingType] = useState<PaddingType>('standard');

  const { updateBlockPropsByPath } = useEditorStore();
  const onChange = (value: number | string | PaddingSeparateValue) => {
    if (!property) {
      return;
    }
    if (typeof value === 'number' || typeof value === 'string') {
      updateBlockPropsByPath(blockPath, property, value === UNDEFINED_VALUE ? undefined : value);
    } else {
      const { top, right, bottom, left } = value;
      updateBlockPropsByPath(blockPath, property, [
        top === UNDEFINED_VALUE ? undefined : top,
        right === UNDEFINED_VALUE ? undefined : right,
        bottom === UNDEFINED_VALUE ? undefined : bottom,
        left === UNDEFINED_VALUE ? undefined : left,
      ]);
    }
  };

  return (
    <>
      {paddingType === 'standard' && (
        <PaddingStandard
          disabled={disabled}
          value={currentValue}
          min={min}
          max={max}
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
          value={currentValue}
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
