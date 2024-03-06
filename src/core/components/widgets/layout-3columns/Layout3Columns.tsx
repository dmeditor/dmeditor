import { nanoid } from 'nanoid';

import { SyledLayout } from './styled';
import { BlockListRender } from 'Src/core/main/renderer';
import { DME } from 'Src/core/types/dmeditor';

const layout3ColumnsWidget: DME.Widget = {
  category: 'layout',
  icon: 'layout-3columns',
  name: '3 Columns layout',
  type: 'layout-3columns',
  events: {
    createBlock: () => {
      return {
        id: nanoid(),
        data: { column1Width: 4, column2Width: 4 },
        type: 'layout-3columns',
        style: { _: 'border' },
        children: [
          {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
          {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
          {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
        ],
      };
    },
    updateData: () => {},
  },
  settings: [
    {
      property: '',
      custom: true,
      name: '',
      settingComponent: 'layout-3columns/setting',
    },
  ],
};

export interface EntityLayout3Columns {
  column1Width: number;
  column2Width: number;
}

const Layout3Columns = (props: DME.WidgetRenderProps<EntityLayout3Columns>) => {
  const {
    rootClasses,
    styleClasses,
    blockNode: {
      data: { column1Width, column2Width },
      children,
    },
  } = props;

  return (
    <SyledLayout className={rootClasses} column1Width={column1Width} column2Width={column2Width}>
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
      <div className={(styleClasses?.['column3'] || '') + ' dme-w-column3'}>
        <BlockListRender
          mode={props.mode}
          blockData={children?.[2].children || []}
          path={[...props.path, 2]}
        />
      </div>
    </SyledLayout>
  );
};

export { layout3ColumnsWidget, Layout3Columns };
