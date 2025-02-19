import { Button, ButtonGroup as MUIButtonGroup } from '@mui/material';

import { DME, useEditorStore } from '../../../..';

const ButtonGroup = (
  props: DME.SettingComponentProps & {
    property: string;
    value: string;
    parameters: { defaultSelected?: string; options: Array<{ text: string; value: string }> };
  },
) => {
  const { property, parameters, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const currentSelected = props.value || parameters.defaultSelected;

  const handleChange = (value: string) => {
    updateBlockPropsByPath(blockPath, property, value);
  };

  return (
    <MUIButtonGroup variant="outlined" size="small">
      {parameters.options.map((item) => (
        <Button
          variant={currentSelected === item.value ? 'contained' : 'outlined'}
          onClick={() => handleChange(item.value)}
        >
          {item.text}
        </Button>
      ))}
    </MUIButtonGroup>
  );
};

export default ButtonGroup;
