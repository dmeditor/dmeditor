import { DME, DMEData } from "Src/core/types/dmeditor";
import { nanoid } from 'nanoid';

const buttonWidget: DME.Widget = {
    category: 'widget',
    icon: 'TextFormatOutlined',
    name: 'Button',
    type: 'button',  
    themeStyles: {'primary': 'Primary', 'variant1':'Variant 1','variant2':'Variant 2', 'cancel':'Cancel',},
    events: {
      createBlock: (): DMEData.Block => {
        return {
          id: nanoid(),
          type: 'button',
          style:{type:'primary'},
          data: {
            value: 'New button',
            link:'#'
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
        name: 'Link',
        property: '.link',
        category: 'settings',
        settingComponent: 'link'        
      }
    ],
  };
  
  export default buttonWidget;
  