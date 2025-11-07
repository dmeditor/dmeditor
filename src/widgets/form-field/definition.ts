import { generalSettings, getCommonSettings, i18n, type DME, type DMEData } from '../..';
import { EntityFormField } from './entity';

const formFieldWidget: DME.Widget = {
  category: 'design',
  icon: 'form-field',
  name: i18n('Form field', 'widget'),
  type: 'form-field',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityFormField> => {
      return {
        type: 'form-field',
        data: {
          label: 'Name',
          identifier: 'name' + Date.now(),
          type: 'text',
          settings: { general: { padding: 10 } },
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Type',
      property: '.type',
      settingComponent: 'select',
      parameters: {
        options: [
          { label: 'Text input', value: 'text' },
          { label: 'Text area', value: 'textarea' },
          { label: 'Checkbox', value: 'checkbox' },
          { label: 'Select', value: 'select' },
          { label: 'Radio', value: 'radio' },
          { label: 'File', value: 'file' },
        ],
      },
    },
    {
      name: 'Label',
      property: '.label',
      settingComponent: 'input',
    },
    {
      name: 'Required',
      property: '.required',
      settingComponent: 'checkbox',
    },
    {
      name: 'Identifier',
      property: '.identifier',
      settingComponent: 'input',
    },
    {
      name: 'Placeholder',
      property: '.placeHolder',
      settingComponent: 'input',
    },
    {
      name: 'Label width',
      identifier: 'form-field-label-width',
      property: 'settings.labelWidth',
      settingComponent: 'distance',
      parameters: { min: 0, max: 700, step: 5 },
      category: 'style',
    },
    {
      name: 'Input shown as new line',
      identifier: 'form-field-new-line',
      property: '.newLine',
      settingComponent: 'checkbox',
      category: 'style',
    },
  ],
};

export default formFieldWidget;
