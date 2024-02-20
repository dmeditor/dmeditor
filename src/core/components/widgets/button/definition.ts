import { DMEData } from 'Core/types';
import { DME } from "Src/core/types";
import { nanoid } from 'nanoid';

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
          data: {
            value: 'New button'
          }
        }          
      },
      updateData: () => {},
    },
    settings: [
      {
        name: 'Text',
        property: '.value',
        category: 'settings',
        settingComponent: 'input'        
      },
      {
        name: 'Color',
        property: 'settings.color',
        category: 'settings',
        settingComponent: 'color'        
      } 
    ],
  };
  
  export default buttonWidget;
  