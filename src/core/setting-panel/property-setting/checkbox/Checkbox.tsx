import { useEffect, useState } from 'react';
import { Checkbox as MUICheckbox } from '@mui/material';
import { DME, useEditorStore } from 'dmeditor';

const Checkbox = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (v: boolean) => {
    updateSelectedBlockProps(property || '', v);
  };

  return (
    <MUICheckbox checked={value ? true : false} onChange={(e) => handleChange(e.target.checked)} />
  );
};

export default Checkbox;
