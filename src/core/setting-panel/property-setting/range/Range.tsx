import { useEditorStore, type DME } from '../../../..';
import { Ranger } from '../../../utils';

const Range = (
  props: DME.SettingComponentProps & {
    property: string;
    value: number;
    parameters: { min: number; max: number; step?: number };
    disabled?: boolean;
  },
) => {
  const { property, parameters, value, blockPath, disabled } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (value: number) => {
    updateBlockPropsByPath(blockPath, property, value);
  };

  return (
    <Ranger
      disabled={disabled}
      defaultValue={value}
      min={parameters.min === undefined ? 1 : parameters.min}
      max={parameters?.max || 5}
      step={parameters?.step || 1}
      onChange={handleChange}
    ></Ranger>
  );
};

export default Range;
