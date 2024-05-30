import { useEditorStore, type DME } from '../../../..';
// import { Ranger } from '../../../utils';
import { Ranger } from '../../../utility/ranger';

const Range = (
  props: DME.SettingComponentProps & {
    property: string;
    value: number;
    parameters: { min: number; max: number; step?: number; disabled?: boolean };
  },
) => {
  const { property, parameters, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (value: number | undefined) => {
    if (!value) return;
    updateBlockPropsByPath(blockPath, property, value);
  };

  return (
    <Ranger
      initialValue={value}
      min={parameters?.min || 1}
      max={parameters?.max || 5}
      step={parameters?.step || 1}
      disabled={parameters?.disabled || false}
      onChange={handleChange}
    ></Ranger>
  );
};

export default Range;
