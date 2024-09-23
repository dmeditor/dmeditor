import type { DME } from '../..';
import { BlockListRender } from '../../core/components/block-list-render';
import { getAllowedTypes } from '../../core/utils/register';
import { EntityGrid } from './entity';
import { StyledGrid } from './styled';

const Grid = (props: DME.WidgetRenderProps<EntityGrid>) => {
  const {
    blockNode,
    blockNode: {
      data: { columns, gap },
      children,
    },
  } = props;

  return (
    <StyledGrid columns={columns} gap={gap}>
      <BlockListRender
        blockData={children || []}
        path={props.path}
        mode={props.mode}
        direction="horizontal"
        isEmbed={blockNode.isEmbed}
        allowedTypes={blockNode.allowedTypes}
      />
    </StyledGrid>
  );
};

export { Grid };
