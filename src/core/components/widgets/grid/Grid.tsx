import { getAllowedTypes } from '..';
import { EntityGrid } from './entity';
import { StyledGrid } from './styled';
import { BlockListRender } from 'Src/core/main/renderer';
import { DME } from 'Src/core/types';

const Grid = (props: DME.WidgetRenderProps<EntityGrid>) => {
  const {
    blockNode,
    blockNode: {
      data: { columns },
      children,
    },
  } = props;

  return (
    <StyledGrid className={props.rootClasses} columns={columns}>
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
