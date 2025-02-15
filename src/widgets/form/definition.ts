import { generalSettings, getCommonSettings, i18n, type DME, type DMEData } from '../..';
import { EntityForm } from './entity';

const formWidget: DME.Widget = {
  category: 'design',
  icon: 'form',
  name: i18n('Form', 'widget'),
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
      name: 'Form type',
      property: '.formType',
      settingComponent: 'input',
      description: 'Eg. cotact_form/feedback_form',
    },
    {
      name: 'Submit text',
      property: '.submitText',
      settingComponent: 'input',
    },
    {
      name: 'Reset text',
      property: '.resetText',
      settingComponent: 'input',
    },
    {
      name: 'Success message',
      property: '.successMessage',
      settingComponent: 'input',
      parameters: { multiline: true },
    },
  ],
};

export default formWidget;
