import * as React from 'react';
import { TextField } from '@mui/material';

import { DME, useEditorStore } from '../../../../src';
import { EntitySampleWidget } from '../entity';

const SettingInput = (props: DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (property) {
      updateBlockPropsByPath(blockPath, property, e.target.value);
    }
  };

  return (
    <div>
      <TextField onChange={handleChange} value={value} />
    </div>
  );
};

export default SettingInput;
