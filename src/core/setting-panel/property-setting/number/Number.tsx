import { useState } from 'react';
import { InfoOutlined, InfoRounded } from '@mui/icons-material';
import { TextField, Tooltip } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../..';

const Number = (props: DME.SettingComponentProps) => {
  const { property, value, parameters, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const [v, setV] = useState<string>(value + '');

  const validate = (v: string) => {
    if (!v) {
      setV('');
    }
    if (/\d+/.test(v)) {
      if (parseInt(v) >= 0) {
        setV(v);
      }
    }
  };

  const handleChange = () => {
    const vInt = parseInt(v);
    updateBlockPropsByPath(blockPath, property!, vInt);
  };

  return (
    <>
      <TextField
        style={{ width: 80 }}
        size="small"
        type="number"
        value={v}
        onBlur={handleChange}
        onChange={(e) => validate(e.target.value)}
      />
    </>
  );
};

export default Number;
