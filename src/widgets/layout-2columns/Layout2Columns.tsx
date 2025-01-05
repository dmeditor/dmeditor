import { Block } from '@mui/icons-material';
import { nanoid } from 'nanoid';

import { BlockListRender, BlockRender, dmeConfig, generalSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';
import { SyledLayout } from './styled';

const layout2ColumnsWidget: DME.Widget = {
  category: 'design',
  icon: 'layout-2columns',
  name: i18n('2 Columns layout', 'widget'),
  type: 'layout-2columns',
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityLayout2Columns, EntityLayout2Children> => {
      return {
        data: { columnWidth: 6 },
        type: 'layout-2columns',
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
        },
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

interface EntityLayout2Children {
  column1: DMEData.Block;
  column2: DMEData.Block;
}

const Layout2Columns = (
  props: DME.WidgetRenderProps<EntityLayout2Columns, EntityLayout2Children>,
) => {
  const {
    styleClasses,
    blockNode: {
      data: { columnWidth },
      children,
    },
  } = props;

  if (!children) {
    return <></>;
  }

  return (
    <SyledLayout columnWidth={columnWidth}>
      <div className={(styleClasses?.['column1'] || '') + ' dme-w-column1'}>
        <BlockRender data={children.column1} mode={props.mode} path={[...props.path, 'column1']} />
      </div>
      <div className={(styleClasses?.['column2'] || '') + ' dme-w-column2'}>
        <BlockRender data={children.column2} mode={props.mode} path={[...props.path, 'column2']} />
      </div>
    </SyledLayout>
  );
};

export { layout2ColumnsWidget, Layout2Columns };
