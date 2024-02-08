import { DMEditorToolKit } from '../../../src/core/index';
import SampleInput from './SampleInput';
import SampleWidget from './SampleWidget';

const {
  addWidgetDefinition,
  registerCommonProperty,
  registerCustomProperty,
  registerPropertyComponent,
  registerWidgetRender,
} = DMEditorToolKit;

const loaderWidget = function () {
  addWidgetDefinition({
    type: 'sample',
    name: 'Sample widget',
    category: 'widget',
    icon: 'A',
    settings: [
      // {
      //   name: 'Level',
      //   settingType: 'range',
      //   category: 'settings',
      //   property: '.level',
      //   parameters: { min: 2, max: 4 },
      // },
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
    // initData: () => {
    //   return { type: 'sample', data: 'This is a sample.', settings: {} };
    // },
  });
  registerWidgetRender('sample', SampleWidget);
  registerPropertyComponent('sampleInput', SampleInput);
};

export default loaderWidget;
