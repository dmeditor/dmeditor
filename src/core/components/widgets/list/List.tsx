import { EntityList } from './entity';
import { StyledList } from './styled';
import { BlockListRender } from 'Src/core/main/renderer';
import { DME } from 'Src/core/types';

const List = (props: DME.WidgetRenderProps<EntityList>) => {
  const {
    blockNode: {
      data: { direction, allowedTypes },
      children,
    },
    adding
  } = props;

  return (
    <StyledList horizontal={direction === 'horizontal'} className="dme-blocktype-list">
      <BlockListRender
        blockData={children || []}
        allowedTypes={allowedTypes}
        path={props.path}
      />
    </StyledList>
  );
};

export { List };
