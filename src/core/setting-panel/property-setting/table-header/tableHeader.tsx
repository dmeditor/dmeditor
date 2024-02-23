import { Checkbox } from '@mui/material';

import Align from '../align/Align';
import Color from '../color/Color';
import { useEditorStore } from 'Core/index';
import { PropertyGroup, PropertyItem } from 'Core/utils';

export default () => {
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();
  const { data } = getSelectedBlock();

  const toggleHeader = () => {
    updateSelectedBlockProps('settings.has-header', !data.settings['has-header'] as any);
  };

  const toggleIsBold = () => {
    updateSelectedBlockProps('settings.is-bold', !data.settings['is-bold'] as any);
  };

  return (
    <>
      <PropertyGroup
        open={!!data.settings['has-header']}
        expandable={true}
        header={
          <PropertyItem label="Has header">
            <Checkbox checked={!!data.settings['has-header']} onChange={toggleHeader} />
          </PropertyItem>
        }
      >
        <PropertyItem label="Align">
          <Align property="settings.header-align" value={data.settings['header-align']} />
        </PropertyItem>
        <PropertyItem label="Is Bold">
          <Checkbox checked={!!data.settings['is-bold']} onChange={toggleIsBold} />
        </PropertyItem>
        <PropertyItem label="Background">
          <Color property="settings.header-background" value={data.settings['header-background']} />
        </PropertyItem>
      </PropertyGroup>
    </>
  );
};
