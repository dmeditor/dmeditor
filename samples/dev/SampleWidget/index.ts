import SettingInput from './SettingInput';
import SampleWidget from './SampleWidget';
import { registerSettingComponent, registerWidget, registerWidgetVariant } from 'Src/core';

const registerSampleWidget = function () {
  registerWidget(
    {
      type: 'sample',
      name: 'Sample widget',
      category: 'widget',
      icon: 'A',
      settings: [
        {
          name: 'Background Color',
          settingComponent: 'color',
          category: 'settings',
          property: 'settings.backgroundColor',
        },
        {
          name: 'Width',
          settingComponent: 'setting_input',
          category: 'settings',
          property: 'settings.width',
        },
      ],
      events: {
        createBlock:() => ({
          level: 2,
          settings: {
            width: 100,
            backgroundColor: '#cccccc',
          },
        }),
        updateData: () => void 0,
      },
    },
    SampleWidget,
  );
  registerSettingComponent('setting_input', SettingInput);

  registerWidgetVariant(
  {
      widget: 'heading',
      identifier: 'gradient',
      name: 'Gradient heading',
      style:{align:'center', space: 'big-space'},
      enabled_settings:['settings.color'],
      defaultData:{
          value: 'Good',
          level: 2
      }
  }
  )
};

export default registerSampleWidget;
