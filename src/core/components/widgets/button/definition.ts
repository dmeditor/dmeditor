import { DME, DMEData } from 'dmeditor/types/dmeditor';
import { nanoid } from 'nanoid';

const buttonWidget: DME.Widget = {
  category: 'widget',
  icon: 'button',
  name: 'Button',
  type: 'button',
  events: {
    createBlock: (): DMEData.Block => {
      return {
        id: nanoid(),
        type: 'button',
        style: { type: 'primary' },
        data: {
          value: 'New button',
          link: '#',
        },
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Text',
      property: '.value',
      settingComponent: 'input',
    },
    {
      name: 'Link',
      property: '.link',
      settingComponent: 'link',
    },
  ],
};

export default buttonWidget;
