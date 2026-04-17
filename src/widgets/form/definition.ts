import { generalSettings, getCommonSettings, i18n, type DME, type DMEData } from '../..';
import { EntityForm } from './entity';

const formWidget: DME.Widget = {
  category: 'design',
  icon: 'form',
  get name() {
    return i18n('Form', 'widget');
  },
  type: 'form',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityForm> => {
      return {
        type: 'form',
        data: {
          formType: 'contact_form',
          settings: { general: { padding: 10 } },
        },
        children: [],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      get name() {
        return i18n('Form type', 'property-label');
      },
      property: '.formType',
      settingComponent: 'input',
      description: 'Eg. cotact_form/feedback_form',
    },
    {
      get name() {
        return i18n('Submit text', 'property-label');
      },
      property: '.submitText',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Reset text', 'property-label');
      },
      property: '.resetText',
      settingComponent: 'input',
    },
    {
      get name() {
        return i18n('Success message', 'property-label');
      },
      property: '.successMessage',
      settingComponent: 'input',
      parameters: { multiline: true },
    },
  ],
};

export default formWidget;
