import { Checkbox as MUICheckbox } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME } from '../../../..';

const Checkbox = (props: DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (v: boolean) => {
    updateBlockPropsByPath(blockPath, property || '', v);
  };

  const checked =
    value === undefined ? Boolean(props.parameters?.defaultValue) : Boolean(value);

  return (
    <MUICheckbox
      disabled={props.disabled}
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
};

export default Checkbox;
