import { registerSettingComponent, registerWidget } from '../../../src/core/index';
import SampleInput from './SampleInput';
import SampleWidget from './SampleWidget';

const loaderWidget = function () {
  registerWidget(
    {
      type: 'sample',
      name: 'Sample widget',
      category: 'widget',
      icon: 'A',
      settings: [
        {
          name: 'Background Color',
          settingType: 'color',
          category: 'settings',
          property: 'settings.backgroundColor',
        },
        {
          name: 'Width',
          settingType: 'sampleInput',
          category: 'settings',
          property: 'settings.width',
        },
      ],
      events: {
        createBlock: () => ({
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
  registerSettingComponent('sampleInput', SampleInput);
};

export default loaderWidget;
