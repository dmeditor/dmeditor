import { BlockListRender } from '../..';
import type { DME } from '../..';
import { getAllowedTypes } from '../../core/utils/register';
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
    <StyledList horizontal={direction === 'horizontal'} className="dme-blocktype-list">
      <BlockListRender
        mode={props.mode}
        blockData={children || []}
        path={props.path}
        direction={direction}
        allowedTypes={getAllowedTypes(blockNode.type)}
      />
    </StyledList>
  );
};

export { List };
