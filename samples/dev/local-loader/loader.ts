import { DMEditor, DMEditorToolKit } from '../../../src/core/index';
import SampleWidget from './SampleWidget';
import SampleInput from './SampleInput';
import { addCustomDefinition } from 'Src/core/components/widgets';

const {
  addWidgetDefinition,
  registerCommonProperty,
  registerCustomProperty,
  registerWidget,
  registerPropertyComponent,
} = DMEditorToolKit;

const loaderWidget = function () {
  addWidgetDefinition({
    type: 'sample',
    name: 'Sample widget',
    category: 'widget',
    icon: 'A',
    settings: [
      {
        name: 'Level',
        settingType: 'range',
        category: 'settings',
        property: '.level',
        parameters: { min: 1, max: 5 },
      },
    ],
    events: {
      createBlock: () => ({ level: 2 }),
      updateData: () => void 0,
    },
    // initData: () => {
    //   return { type: 'sample', data: 'This is a sample.', settings: {} };
    // },
  });
  registerWidget('sample', SampleWidget);
  registerCommonProperty('width', 'Width');
  registerCommonProperty('Font color', 'Color');

  // addCustomDefinition({
  //   type: 'custom sample',
  //   name: 'Sample widget',
  //   category: 'widget',
  //   icon: 'A',
  //   settings: [
  //     {
  //       name: 'Level',
  //       settingType: 'range',
  //       category: 'settings',
  //       property: 'level',
  //       parameters: { min: 1, max: 5 },
  //     },
  //   ],
  //   events: {
  //     createBlock: () => void 0,
  //     updateData: () => void 0,
  //   },
  // });
  // registerCustomProperty('Sample Number', 'SampleInput');
  // registerPropertyComponent('SampleInput', SampleInput);

  // addCustomDefinition({
  //   type: 'custom sample',
  //   name: 'Sample widget',
  //   category: 'widget',
  //   icon: 'A',
  //   settings: [
  //     {
  //       name: 'Level',
  //       settingType: 'range',
  //       category: 'settings',
  //       property: 'level',
  //       parameters: { min: 1, max: 5 },
  //     },
  //   ],
  //   events: {
  //     createBlock: () => void 0,
  //     updateData: () => void 0,
  //   },
  // });
  // DMEditor.component('custom sample', SampleWidget);
};

export default loaderWidget;
