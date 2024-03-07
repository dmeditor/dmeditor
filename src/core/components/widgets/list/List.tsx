import { BlockListRender } from 'dmeditor/main/renderer';
import { DME } from 'dmeditor/types/dmeditor';

import { getAllowedTypes } from '..';
import { EntityList } from './entity';
import { StyledList } from './styled';

const List = (props: DME.WidgetRenderProps<EntityList>) => {
  const {
    blockNode: {
      data: { direction, align },
      children,
    },
    blockNode,
  } = props;

  return (
    <StyledList
      horizontal={direction === 'horizontal'}
      align={align}
      className="dme-blocktype-list"
    >
      <BlockListRender
        blockData={children || []}
        path={props.path}
        direction={direction}
        allowedTypes={getAllowedTypes(blockNode.type)}
      />
    </StyledList>
  );
};

export { List };
