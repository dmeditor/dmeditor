import * as React from 'react';
import { TextField } from '@mui/material';

import { useEditorStore } from 'Src/core/main/store';

const SettingInput = (props: { property: string; value: number }) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedBlockProps(property, e.target.value);
  };

  return (
    <div>
      <TextField onChange={handleChange} value={value} />
    </div>
  );
};

export default SettingInput;
