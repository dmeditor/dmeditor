import { DME } from "Src/core/types";
import { EntityList } from "./entity";

const listWidget: DME.Widget = {
    category: 'section',
    icon: 'TextFormatOutlined',
    name: 'List',
    type: 'list',
    events: {
      createBlock: (): EntityList => {
        return {};
      },
      updateData: () => {},
    },
    settings: [          
    ],
  };
  
  export default listWidget;
  