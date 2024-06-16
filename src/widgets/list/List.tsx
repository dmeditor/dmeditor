import { BlockListRender } from '../..';
import type { DME } from '../..';
import { getAllowedTypes } from '../../core/utils/register';
import { EntityList } from './entity';
import { StyledList } from './styled';

const List = (props: DME.WidgetRenderProps<EntityList>) => {
  const {
    blockNode: {
      data: { direction, itemGap },
      children,
    },
    blockNode,
  } = props;

  return (
    <StyledList
      horizontal={direction === 'horizontal'}
      itemGap={itemGap}
      className="dme-blocktype-list"
    >
      <BlockListRender
        mode={props.mode}
        blockData={children || []}
        path={props.path}
        direction={direction}
        isEmbed={blockNode.isEmbed}
        allowedTypes={blockNode.allowedTypes}
      />
    </StyledList>
  );
};

export { List };
