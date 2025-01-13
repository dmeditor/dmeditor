import { generalSettings, i18n, type DME, type DMEData } from '../..';
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
          identifier: 'name',
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
          { label: 'Checkbox', value: 'checkbox' },
          { label: 'Text area', value: 'textarea' },
          { label: 'Select', value: 'select' },
          { label: 'Radio', value: 'radio' },
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
      name: 'Input shown as new line',
      property: '.newLine',
      settingComponent: 'checkbox',
      category: 'style',
    },
    ...generalSettings,
  ],
};

export default formFieldWidget;
