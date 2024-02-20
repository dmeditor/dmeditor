import { TextField } from '@mui/material';
import { useEditorStore } from 'Src/core/main/store';
import { DME } from 'Src/core/types/dmeditor';
import { useEffect, useState } from 'react';


const Link = ( props: DME.SettingComponentProps) => {
    const {property, value} = props;
    const {updateSelectedBlockProps} = useEditorStore();

    const handleChange = (v: string) => {
      //todo: validate
        updateSelectedBlockProps(property, v);
    };

  return (
    <TextField size='small' value={value} onChange={(e)=>handleChange(e.target.value)} />
  );
};

export default Link;
