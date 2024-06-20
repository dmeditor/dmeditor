import { ContrastOutlined } from '@mui/icons-material';
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
  const projectColors = (parameters && parameters['colors']) ||
    dmeConfig.editor.colors[
      parameters && parameters['colorGroup'] ? (parameters['colorGroup'] as string) : 'default'
    ] || ['#000000', '#fffffff'];
  const { recentColors, handleUpdateRecentColors } = useRecentColors();

  const handleChange = (color?: string) => {
    updateBlockPropsByPath(blockPath, property, color);
  };

  return (
    <ul className={colorList}>
      <ColorPickerItem
        style={{ background: value ?? 'unset', cursor: value ? 'pointer' : 'initial' }}
        selected
        title={value ? 'Click to unset' : 'Not set'}
        unset={!value}
        onClick={() => {
          updateBlockPropsByPath(blockPath, property, undefined);
        }}
      >
        {!value && <ColorNotSet style={{ fontSize: 28 }} />}
      </ColorPickerItem>
      {projectColors.map((color, index) => {
        return (
          <ColorPickerItem
            key={index}
            style={{ background: color }}
            onClick={() => {
              updateBlockPropsByPath(blockPath, property, color);
            }}
            unset={!color}
          >
            {!color && <ColorNotSet toolTip="Unset" />}
          </ColorPickerItem>
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
