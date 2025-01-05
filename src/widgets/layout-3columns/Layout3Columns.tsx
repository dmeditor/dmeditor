import { nanoid } from 'nanoid';

import { BlockListRender, BlockRender, dmeConfig, generalSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';
import { SyledLayout } from './styled';

const layout3ColumnsWidget: DME.Widget = {
  category: 'design',
  icon: 'layout-3columns',
  name: i18n('3 Columns layout', 'widget'),
  type: 'layout-3columns',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityLayout3Columns, EntityLayout3Children> => {
      return {
        data: { column1Width: 4, column2Width: 4 },
        type: 'layout-3columns',
        children: {
          column1: {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
          column2: {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
          column3: {
            id: nanoid(),
            data: {},
            type: 'list',
            children: [],
          },
        },
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

interface EntityLayout3Children {
  column1: DMEData.Block;
  column2: DMEData.Block;
  column3: DMEData.Block;
}

const Layout3Columns = (
  props: DME.WidgetRenderProps<EntityLayout3Columns, EntityLayout3Children>,
) => {
  const {
    styleClasses,
    blockNode: {
      data: { column1Width, column2Width },
      children,
    },
  } = props;

  if (!children) {
    return <></>;
  }

  return (
    <SyledLayout column1Width={column1Width} column2Width={column2Width}>
      <div className={(styleClasses?.['column1'] || '') + ' dme-w-column1'}>
        <BlockRender data={children.column1} mode={props.mode} path={[...props.path, 'column1']} />
      </div>
      <div className={(styleClasses?.['column2'] || '') + ' dme-w-column2'}>
        <BlockRender data={children.column1} mode={props.mode} path={[...props.path, 'column2']} />
      </div>
      <div className={(styleClasses?.['column3'] || '') + ' dme-w-column3'}>
        <BlockRender data={children.column1} mode={props.mode} path={[...props.path, 'column3']} />
      </div>
    </SyledLayout>
  );
};

export { layout3ColumnsWidget, Layout3Columns };
