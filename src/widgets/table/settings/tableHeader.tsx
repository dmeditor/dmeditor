import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import { Checkbox } from '@mui/material';

import { DME, useEditorStore } from '../../..';
// import Align from '../../../core/setting-panel/property-setting/align/Align';
// import Color from '../../../core/setting-panel/property-setting/color/Color';
import { PickColor, PropertyButton, PropertyGroup, PropertyItem } from '../../../core/utils';

type AlignType = 'left' | 'center' | 'right';
const alignList: { value: AlignType; icon: React.ReactNode }[] = [
  { value: 'left', icon: <FormatAlignLeft /> },
  { value: 'center', icon: <FormatAlignCenter /> },
  { value: 'right', icon: <FormatAlignRight /> },
];

export const TableHeader = (props: DME.SettingComponentProps) => {
  const { blockPath } = props;
  const { getBlockByPath, updateBlockPropsByPath } = useEditorStore();
  const { data } = getBlockByPath(blockPath) || {};

  if (!data) {
    return null;
  }

  const toggleHeader = () => {
    updateBlockPropsByPath(blockPath, 'settings.hasHeader', !data.settings?.['hasHeader'] as any);
  };

  const toggleIsBold = () => {
    updateBlockPropsByPath(
      blockPath,
      'settings.headerIsBold',
      !data.settings?.['headerIsBold'] as any,
    );
  };

  const handleAlignChange = (value: AlignType) => {
    updateBlockPropsByPath(blockPath, 'settings.headerAlign', value);
  };

  const handleBackgroundChange = (value?: string) => {
    updateBlockPropsByPath(blockPath, 'settings.headerBackground', value);
  };

  const handleColorChange = (value?: string) => {
    updateBlockPropsByPath(blockPath, 'settings.headerColor', value);
  };

  return (
    <>
      <PropertyItem label="Has header">
        <Checkbox checked={!!data.settings?.['hasHeader']} onChange={toggleHeader} />
      </PropertyItem>
      {!!data.settings?.['hasHeader'] && (
        <PropertyGroup header="Header">
          <PropertyItem label="Align">
            {alignList.map((alignItem) => {
              return (
                <PropertyButton
                  title={alignItem.value}
                  key={alignItem.value}
                  onClick={() => handleAlignChange(alignItem.value)}
                  selected={data.settings?.['headerAlign'] === alignItem.value}
                >
                  {alignItem.icon}
                </PropertyButton>
              );
            })}
          </PropertyItem>
          <PropertyItem label="Is Bold">
            <Checkbox checked={!!data.settings?.['headerIsBold']} onChange={toggleIsBold} />
          </PropertyItem>
          <PropertyItem label="Text color">
            <PickColor
              color={data.settings?.['headerColor'] as string}
              onChange={handleColorChange}
            />
          </PropertyItem>
          <PropertyItem label="Background">
            <PickColor
              color={data.settings?.['headerBackground'] as string}
              onChange={handleBackgroundChange}
            />
          </PropertyItem>
        </PropertyGroup>
      )}
    </>
  );
};
