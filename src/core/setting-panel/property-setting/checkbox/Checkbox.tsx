import { Checkbox as MUICheckbox } from '@mui/material';

import { useEditorStore } from '../../../../core';
import type { DME } from '../../../../core';

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
