import { nanoid } from 'nanoid';
import { EntityList } from './entity';
import { DME, DMEData } from 'Src/core/types';
import { getWidgetVariant } from '..';

const listWidget: DME.Widget = {
  category: 'section',
  icon: 'TextFormatOutlined',
  name: 'List',
  type: 'list',
  events: {
    createBlock: (variant?:string) => {
      if( variant){
        const variantDef = getWidgetVariant('list', variant);
        if(variantDef && variantDef.getDefaultData ){
            return variantDef.getDefaultData();
        }
      }
      return {
        id: nanoid(),
        data:{},
        type: 'list',     
        children:[]   
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Direction',
      property: '.direction',
      category: 'settings',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Vertical', value: 'vertical' },
          { text: 'Horizontal', value: 'horizontal' },
        ],
      },
    },
    {
      name: 'Align',
      property: '.align',
      category: 'settings',
      settingComponent: 'button-group',
      parameters: {
        options: [
          { text: 'Left', value: 'left' },
          { text: 'Center', value: 'center' },
          { text: 'Right', value: 'end' }          
        ],
      },
    },
  ],
};

export default listWidget;
