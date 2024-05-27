import { TextField } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../..';

const Input = (props: DME.SettingComponentProps) => {
  const { property, value, parameters, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (v: string) => {
    updateBlockPropsByPath(blockPath, property!, v);
  };

  return (
    <TextField
      size="small"
      {...parameters}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Input;
