import { TextField } from '@mui/material';

import { useEditorStore } from '../../../../core';
import type { DME } from '../../../../core';

const Input = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (v: string) => {
    updateSelectedBlockProps(property, v);
  };

  return <TextField size="small" value={value} onChange={(e) => handleChange(e.target.value)} />;
};

export default Input;
