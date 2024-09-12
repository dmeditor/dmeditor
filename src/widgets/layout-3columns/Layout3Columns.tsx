import { BlockListRender, dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
import { SyledLayout } from './styled';

const layout3ColumnsWidget: DME.Widget = {
  category: 'design',
  icon: 'layout-3columns',
  name: '3 Columns layout',
  type: 'layout-3columns',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityLayout3Columns, {}> => {
      return {
        data: { column1Width: 4, column2Width: 4 },
        type: 'layout-3columns',
        children: [
          {
            children: [],
          },
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
      property: '',
      custom: true,
      name: '',
      settingComponent: 'layout-3columns/setting',
    },
    ...generalSettings,
  ],
};

export interface EntityLayout3Columns {
  column1Width: number;
  column2Width: number;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

const Layout3Columns = (props: DME.WidgetRenderProps<EntityLayout3Columns>) => {
  const {
    styleClasses,
    blockNode: {
      data: { column1Width, column2Width },
      children,
    },
  } = props;

  return (
    <SyledLayout column1Width={column1Width} column2Width={column2Width}>
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
