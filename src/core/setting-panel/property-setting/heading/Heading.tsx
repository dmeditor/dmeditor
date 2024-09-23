import * as React from 'react';
import { useEffect, useState } from 'react';
import { LoopOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types/dmeditor';

import { PropertyButton } from '../../../utils';

const HeadingSetting = (
  props: { value?: string; property: string } & DME.SettingComponentProps,
) => {
  const { property, value, blockPath, parameters } = props;

  const { getBlockByPath, updateBlockPropsByPath } = useEditorStore();

  const [id, setId] = useState(value);

  const generateId = () => {
    const data = getBlockByPath(blockPath).data as any;
    const value = data.value;
    const newId = value
      .trim()
      .replace(/\s/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase();
    setId(newId);
  };

  useEffect(() => {
    updateBlockPropsByPath(blockPath, property!, id);
  }, [id]);

  return (
    <>
      <TextField
        sx={{ width: 'calc(100% - 37px)' }}
        placeholder="Please enter ID"
        value={id}
        size="small"
        hiddenLabel
        variant="outlined"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <PropertyButton title="Auto generate Id" onClick={generateId}>
        <LoopOutlined />
      </PropertyButton>
    </>
  );
};

export default HeadingSetting;
