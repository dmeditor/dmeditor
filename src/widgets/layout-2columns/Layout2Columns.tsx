import { nanoid } from 'nanoid';

import { BlockListRender, dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
import { SyledLayout } from './styled';

const layout2ColumnsWidget: DME.Widget = {
  category: 'design',
  icon: 'layout-2columns',
  name: '2 Columns layout',
  type: 'layout-2columns',
  events: {
    createBlock: (): DMEData.Block<EntityLayout2Columns, {}> => {
      return {
        id: nanoid(),
        data: { columnWidth: 6 },
        type: 'layout-2columns',
        children: [
          {
            children: [],
          },
          {
            children: [],
          },
        ],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      property: '.columnWidth',
      name: 'Column width',
      settingComponent: 'range',
      parameters: { min: 1, max: 11 },
    },
    ...generalSettings,
  ],
};

interface EntityLayout2Columns {
  columnWidth: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const Layout2Columns = (props: DME.WidgetRenderProps<EntityLayout2Columns>) => {
  const {
    rootClasses,
    styleClasses,
    blockNode: {
      data: { columnWidth },
      children,
    },
  } = props;

  return (
    <SyledLayout columnWidth={columnWidth}>
      <div className={(styleClasses?.['column1'] || '') + ' dme-w-column1'}>
        <BlockListRender
          mode={props.mode}
          blockData={children?.[0].children || []}
          path={[...props.path, 0]}
        />
      </div>
      <div className={(styleClasses?.['column2'] || '') + ' dme-w-column2'}>
        <BlockListRender
          mode={props.mode}
          blockData={children?.[1].children || []}
          path={[...props.path, 1]}
        />
      </div>
    </SyledLayout>
  );
};

export { layout2ColumnsWidget, Layout2Columns };
