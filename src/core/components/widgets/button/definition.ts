import { nanoid } from 'nanoid';

import { DME, DMEData } from 'Src/core/types/dmeditor';

const buttonWidget: DME.Widget = {
  category: 'widget',
  icon: 'TextFormatOutlined',
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
