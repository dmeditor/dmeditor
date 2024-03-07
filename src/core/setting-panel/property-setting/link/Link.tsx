import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/main/store';
import { DME } from 'dmeditor/types/dmeditor';

const Link = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (v: string) => {
    //todo: add button to select
    updateSelectedBlockProps(property, v);
  };

  return <TextField size="small" value={value} onChange={(e) => handleChange(e.target.value)} />;
};

export default Link;
