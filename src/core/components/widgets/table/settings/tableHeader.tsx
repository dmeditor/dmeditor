import { useEffect, useState } from 'react';
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { debounce } from 'lodash';

import Align from '../../../../setting-panel/property-setting/align/Align';
import Color from '../../../../setting-panel/property-setting/color/Color';
import { useTableStore } from '../store';
import { useEditorStore } from 'Core/index';
import { PickColor, PropertyButton, PropertyItem, Ranger } from 'Core/utils';

type AlignType = 'left' | 'center' | 'right';
const alignList: { value: AlignType; icon: React.ReactNode }[] = [
  { value: 'left', icon: <FormatAlignLeft /> },
  { value: 'center', icon: <FormatAlignCenter /> },
  { value: 'right', icon: <FormatAlignRight /> },
];

export const TableHeader = () => {
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();
  const { data } = getSelectedBlock() || {};
  const { width2, setWidth2, setWidth, setColor: setStateColor } = useTableStore();
  const [test, setTest] = useState(20);
  const [color, setColor] = useState('#cccccc');

  useEffect(() => {
    setStateColor(color);
  }, [color]);

  useEffect(() => {
    setWidth(test);
  }, [test]);

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
      {!!data.settings?.['hasHeader'] && (
        <>
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
          <Ranger defaultValue={test} min={10} max={500} step={1} onChange={setTest} />
          <Ranger defaultValue={width2} min={10} max={50} step={1} onChange={setWidth2} />
          <PickColor color={color} onChange={setColor} />
        </>
      )}
    </>
  );
};
