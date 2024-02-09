import * as React from 'react';
import { TextField } from '@mui/material';
import { DME } from 'Src/core/types';

import { EntitySampleWidget } from './entity';
import { useEditorStore } from 'Src/core';

const SettingInput = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();

  const blockData = getSelectedBlock<EntitySampleWidget>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedBlockProps(property, e.target.value);
  };

  return (
    <div>
      <TextField onChange={handleChange} value={value} />
      Color: {blockData?.data.settings.backgroundColor}
    </div>
  );
};

export default SettingInput;
