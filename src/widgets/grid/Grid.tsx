import type { DME } from '../..';
import { BlockListRender } from '../../core/components/block-list-render';
import { getAllowedTypes } from '../../core/utils/register';
import { EntityGrid } from './entity';
import { StyledGrid } from './styled';

const Grid = (props: DME.WidgetRenderProps<EntityGrid>) => {
  const {
    blockNode,
    blockNode: {
      data: { columns },
      children,
    },
  } = props;

  return (
    <StyledGrid columns={columns}>
      <BlockListRender
        blockData={children || []}
        path={props.path}
        mode={props.mode}
        direction="horizontal"
        allowedTypes={getAllowedTypes(blockNode.type)}
      />
    </StyledGrid>
  );
};

export { Grid };
