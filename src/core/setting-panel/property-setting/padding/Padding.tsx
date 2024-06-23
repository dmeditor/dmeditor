import React, { useState } from 'react';

import { useEditorStore } from '../../../main/store';
import { type DME } from '../../../types';
import { isNumber } from '../../../utils';
import PaddingSeparate from './PaddingSeparate';
import PaddingStandard from './PaddingStandard';
import PaddingSymmetric from './PaddingSymmetric';

type PaddingType = 'standard' | 'symmetric' | 'separate';

const Padding: React.FC<DME.SettingComponentProps> = (props) => {
  const { value, parameters, blockPath, property, disabled } = props;
  const min = isNumber(parameters?.min) ? parameters?.min : 0;
  const max = isNumber(parameters?.max) ? parameters?.max : 100;
  const step = isNumber(parameters?.step) ? parameters?.step : 1;
  const currentValue = isNumber(value) ? value : undefined;
  const [paddingType, setPaddingType] = useState<PaddingType>('standard');

  const { updateBlockPropsByPath } = useEditorStore();
  const onChange = (
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
  ) => {
    if (!property) {
      return;
    }
    if (typeof value === 'number' || typeof value === 'string') {
      updateBlockPropsByPath(blockPath, property, value);
    } else {
      updateBlockPropsByPath(blockPath, property, [
        value.top,
        value.right,
        value.bottom,
        value.left,
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
          onChangePaddingType={() => setPaddingType('symmetric')}
        />
      )}
      {paddingType === 'symmetric' && (
        <PaddingSymmetric
          disabled={disabled}
          value={currentValue}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          onChangePaddingType={() => setPaddingType('separate')}
        />
      )}
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
