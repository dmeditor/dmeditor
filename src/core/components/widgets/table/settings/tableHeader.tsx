import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import { Checkbox } from '@mui/material';

import Align from '../../../../setting-panel/property-setting/align/Align';
import Color from '../../../../setting-panel/property-setting/color/Color';
import { useEditorStore } from 'Core/index';
import { PickColor, PropertyButton, PropertyItem } from 'Core/utils';

type AlignType = 'left' | 'center' | 'right';
const alignList: { value: AlignType; icon: React.ReactNode }[] = [
  { value: 'left', icon: <FormatAlignLeft /> },
  { value: 'center', icon: <FormatAlignCenter /> },
  { value: 'right', icon: <FormatAlignRight /> },
];

export const TableHeader = () => {
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();
  const { data } = getSelectedBlock() || {};

  if (!data) {
    return null;
  }

  const toggleHeader = () => {
    updateSelectedBlockProps('settings.hasHeader', !data.settings?.['hasHeader'] as any);
  };

  const toggleIsBold = () => {
    updateSelectedBlockProps('settings.headerIsBold', !data.settings?.['headerIsBold'] as any);
  };

  const handleAlignChange = (value: AlignType) => {
    updateSelectedBlockProps('settings.headerAlign', value);
  };

  const handleBackgroundChange = (value: string) => {
    updateSelectedBlockProps('settings.headerBackground', value);
  };

  return (
    <>
      <PropertyItem label="Has header">
        <Checkbox checked={!!data.settings?.['hasHeader']} onChange={toggleHeader} />
      </PropertyItem>
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
      <PropertyItem label="Background">
        <PickColor
          color={data.settings?.['headerBackground'] as string}
          onChange={handleBackgroundChange}
        />
      </PropertyItem>
    </>
  );
};
