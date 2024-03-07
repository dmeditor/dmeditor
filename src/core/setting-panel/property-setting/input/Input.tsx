import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/main/store';
import { DME } from 'dmeditor/types/dmeditor';

const Input = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (v: string) => {
    updateSelectedBlockProps(property, v);
  };

  return <TextField size="small" value={value} onChange={(e) => handleChange(e.target.value)} />;
};

export default Input;
