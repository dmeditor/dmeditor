import { DMEData } from 'Core/types';
import { DME } from "Src/core/types";
import { EntityGrid } from "./entity";
import { nanoid } from 'nanoid';

const gridWidget: DME.Widget = {
    // ?category options: widget, layout, form, chart, advanced
    category: 'layout',
    icon: 'TextFormatOutlined',
    name: 'Grid',
    type: 'grid',  
    allowedTypes:'^(?!.*grid).*$',
    events: {
      createBlock: (): DMEData.Block<EntityGrid> => {
        return {
          id: nanoid(),
          type: 'grid',
          data: {
            columns: 3
          },
          children:[]
        };
      },
      updateData: () => {},
    },    
    settings: [
      {
        name: 'Columns',
        settingComponent: 'range',
        category: 'settings',
        property: '.columns',
        parameters: { min: 1, max: 5 },
      },      
    ],
  };
  
  export default gridWidget;
  