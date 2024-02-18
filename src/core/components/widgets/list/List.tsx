import { getAllowedTypes } from '..';
import { EntityList } from './entity';
import { StyledList } from './styled';
import { BlockListRender } from 'Src/core/main/renderer';
import { DME } from 'Src/core/types';

const List = (props: DME.WidgetRenderProps<EntityList>) => {
  const {
    blockNode: {
      data: { direction, align },
      children,
    },
    blockNode,
  } = props;

  return (
    <StyledList horizontal={direction === 'horizontal'} align={align} className="dme-blocktype-list">
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
