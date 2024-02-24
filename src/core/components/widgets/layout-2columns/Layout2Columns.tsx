import { nanoid } from 'nanoid';

import { SyledLayout } from './styled';
import { BlockListRender } from 'Src/core/main/renderer';
import { DME } from 'Src/core/types/dmeditor';

const layout2ColumnsWidget: DME.Widget = {
  category: 'layout',
  icon: 'TextFormatOutlined',
  name: '2 Columns layout',
  type: 'layout-2columns',
  events: {
    createBlock: () => {
      return {
        id: nanoid(),
        data: {},
        type: 'layout-2columns',
        style: { _: 'half-half' },
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
        ],
      };
    },
    updateData: () => {},
  },
  settings: [],
};

const Layout2Columns = (props: DME.WidgetRenderProps) => {
  const {
    rootClasses,
    styleClasses,
    blockNode: {
      data: {},
      children,
    },
  } = props;

  return (
    <SyledLayout className={rootClasses}>
      <div className={styleClasses?.['column1'] + ' dme-w-column1'}>
        <BlockListRender blockData={children?.[0].children || []} path={[...props.path, 0]} />
      </div>
      <div className={styleClasses?.['column2'] + ' dme-w-column2'}>
        <BlockListRender blockData={children?.[1].children || []} path={[...props.path, 1]} />
      </div>
    </SyledLayout>
  );
};

export { layout2ColumnsWidget, Layout2Columns };
