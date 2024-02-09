import { DME } from "Src/core/types";
import { EntityGrid } from "./entity";

const gridWidget: DME.Widget = {
    // ?category options: widget, layout, form, chart, advanced
    category: 'layout',
    icon: 'TextFormatOutlined',
    name: 'Grid',
    type: 'grid',
    events: {
      createBlock: (): EntityGrid => {
        return {
          columns: 3
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
  