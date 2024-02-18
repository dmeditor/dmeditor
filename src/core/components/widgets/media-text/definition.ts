import { DMEData } from 'Core/types';
import { DME } from "Src/core/types";
import { nanoid } from 'nanoid';
import { EntityImageText } from './entity';

const mediaTextWidget: DME.Widget = {
    // ?category options: widget, layout, form, chart, advanced
    category: 'layout',
    icon: 'TextFormatOutlined',
    name: 'Media text',
    type: 'media-text',  
    isBase: true,
    events: {
      createBlock: (): DMEData.Block<EntityImageText> => {
        return {
          id: nanoid(),
          type: 'media-text',
          data: {
          },
          children:[            
            {
                id: nanoid(),
                type: 'heading',
                data: {
                  value: 'Heading1',
                  level: 2,                  
                },
            },
            {
                id:nanoid(),
                type:'list',
                data:{},
                children:[
                  {
                      id: nanoid(),
                      type: 'heading',
                      data: {
                        value: 'Heading 2',
                        level: 2,                         
                      },
                  }                    
                ]
            }
          ]
        };
      },
      updateData: () => {},
    },
    settings: [
      {
        name: 'Media position',
        property: '.mediaPosition',
        category: 'settings',
        settingComponent: 'button-group',
        parameters: {
          options: [
            { text: 'Left', value: 'left' },
            { text: 'Right', value: 'right' },
          ],
        },
      } 
    ],
  };
  
  export default mediaTextWidget;
  