import { TextField } from '@mui/material';
import { useEditorStore } from 'Src/core/main/store';
import { DME } from 'Src/core/types/dmeditor';


const Input = ( props: DME.SettingComponentProps) => {
    const {property, value} = props;
    const {updateSelectedBlockProps} = useEditorStore();

    const handleChange = (v: string) => {
        updateSelectedBlockProps(property, v);
      };

  return (
    <TextField size='small' defaultValue={value} onChange={(e)=>handleChange(e.target.value)} />
  );
};

export default Input;
