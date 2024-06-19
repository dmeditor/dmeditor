import { DME, useEditorStore } from '../../../..';
import { PickColor, useRecentColors } from '../../../utils/PickColor';
import { colorList, ColorPickerItem } from './styled';

const ColorSetting = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();
  const projectColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', undefined];
  const { recentColors, handleUpdateRecentColors } = useRecentColors();

  const handleChange = (color?: string) => {
    updateBlockPropsByPath(blockPath, property, color);
  };

  return (
    <ul className={colorList}>
      <ColorPickerItem style={{ background: value ?? 'unset' }} selected unset={!value} />
      {projectColors.map((color, index) => {
        return (
          <ColorPickerItem
            key={index}
            style={{ background: color }}
            onClick={() => {
              updateBlockPropsByPath(blockPath, property, color);
            }}
            unset={!color}
          />
        );
      })}
      <PickColor
        color={value}
        width={20}
        displaySelectedColor={false}
        recentColors={recentColors}
        onChange={handleChange}
        onChangeComplete={handleUpdateRecentColors}
      />
    </ul>
  );
};

export default ColorSetting;
