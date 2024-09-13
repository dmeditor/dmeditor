import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../..';

const Input = (props: DME.SettingComponentProps) => {
  const { property, value, parameters, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const [v, setV] = useState<string>(value ? (value as string) : '');

  const handleChange = () => {
    updateBlockPropsByPath(blockPath, property!, v);
  };

  const updateOnUnfocus = parameters?.updateOnUnfocus;
  useEffect(() => {
    if (!updateOnUnfocus) {
      handleChange();
    }
  }, [v]);

  return (
    <TextField
      size="small"
      {...parameters}
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => {
        if (updateOnUnfocus) {
          handleChange();
        }
      }}
    />
  );
};

export default Input;
