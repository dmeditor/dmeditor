import { generalSettings, getCommonSettings, i18n, type DME, type DMEData } from '../..';
import { EntityFormField } from './entity';

const formFieldWidget: DME.Widget = {
  category: 'design',
  icon: 'form-field',
  get name() {
    return i18n('Form field', 'widget');
  },
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
      get name() {
        return i18n('Type', 'property-label');
      },
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
      get name() {
        return i18n('Label', 'property-label');
      },
      property: '.label',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Required', 'property-label');
      },
      property: '.required',
      settingComponent: 'checkbox',
    },
    {
      get name() {
        return i18n('Identifier', 'property-label');
      },
      property: '.identifier',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Placeholder', 'property-label');
      },
      property: '.placeHolder',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Label width', 'property-label');
      },
      identifier: 'form-field-label-width',
      property: 'settings.labelWidth',
      settingComponent: 'distance',
      parameters: { min: 0, max: 700, step: 5 },
      category: 'style',
    },
    {
      get name() {
        return i18n('Input shown as new line', 'property-label');
      },
      identifier: 'form-field-new-line',
      property: '.newLine',
      settingComponent: 'checkbox',
      category: 'style',
    },
  ],
};

export default formFieldWidget;
