import { Checkbox } from '@mui/material';

import Align from '../../../../../setting-panel/property-setting/align/Align';
import Color from '../../../../../setting-panel/property-setting/color/Color';
import { useEditorStore } from 'Core/index';
import { PropertyItem } from 'Core/utils';

export default () => {
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();
  const { data } = getSelectedBlock();

  const toggleHeader = () => {
    updateSelectedBlockProps('settings.hasHeader', !data.settings['hasHeader'] as any);
  };

  const toggleIsBold = () => {
    updateSelectedBlockProps('settings.headerIsBold', !data.settings['headerIsBold'] as any);
  };

  return (
    <>
      <PropertyItem label="Has header">
        <Checkbox checked={!!data.settings['has-header']} onChange={toggleHeader} />
      </PropertyItem>
      <PropertyItem label="Align">
        <Align property="settings.header-align" value={data.settings['header-align']} />
      </PropertyItem>
      <PropertyItem label="Is Bold">
        <Checkbox checked={!!data.settings['is-bold']} onChange={toggleIsBold} />
      </PropertyItem>
      <PropertyItem label="Background">
        <Color property="settings.header-background" value={data.settings['header-background']} />
      </PropertyItem>
    </>
  );
};
