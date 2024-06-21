import { ContrastOutlined, Delete, DeleteOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { DME, dmeConfig, useEditorStore } from '../../../..';
import { PickColor, useRecentColors } from '../../../utils/PickColor';
import { colorList, ColorPickerItem } from './styled';

const ColorNotSet = (props) => {
  const style = props.style;
  return (
    <Tooltip title={props.toolTip}>
      <ContrastOutlined
        style={{ transform: 'rotate(45deg)', fontSize: 22, color: '#666666', ...style }}
      />
    </Tooltip>
  );
};

const ColorSetting = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath, parameters } = props;
  const { updateBlockPropsByPath } = useEditorStore();
  const projectColors: Array<DME.ColorConfig> = (parameters && parameters['colors']) ||
    dmeConfig.editor.colors[
      parameters && parameters['colorGroup'] ? (parameters['colorGroup'] as string) : 'default'
    ] || [
      { color: '#000000', name: 'Black' },
      { color: '#fffffff', name: 'white' },
    ];
  const { recentColors, handleUpdateRecentColors } = useRecentColors();

  const handleChange = (color?: string) => {
    updateBlockPropsByPath(blockPath, property, color);
  };

  return (
    <ul className={colorList}>
      <ColorPickerItem
        style={{ backgroundColor: value ?? 'unset', cursor: value ? 'pointer' : 'initial' }}
        selected
        title={value ? 'Click to unset' : 'Not set'}
        unset={!value}
        onClick={() => {
          updateBlockPropsByPath(blockPath, property, undefined);
        }}
      >
        {!value && <ColorNotSet style={{ fontSize: 28 }} />}
      </ColorPickerItem>
      {projectColors.map((colorItem, index) => {
        return (
          <ColorPickerItem
            key={index}
            title={colorItem.color && colorItem.name ? colorItem.name : ''}
            style={{ background: colorItem.color }}
            onClick={() => {
              updateBlockPropsByPath(blockPath, property, colorItem.color);
            }}
            unset={!colorItem.color}
          ></ColorPickerItem>
        );
      })}
      <PickColor
        title="Color palette"
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
