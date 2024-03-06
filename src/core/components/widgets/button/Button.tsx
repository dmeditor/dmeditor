import { BlockListRender } from 'dmeditor/main/renderer';
import { DME } from 'dmeditor/types/dmeditor';

import { EntityButton } from './entity';
import { StyledButton } from './styled';

const Button = (props: DME.WidgetRenderProps<EntityButton>) => {
  const {
    blockNode,
    blockNode: {
      data: { value, link },
    },
  } = props;

  return (
    <StyledButton href={link} className={props.rootClasses}>
      {value}
    </StyledButton>
  );
};

export { Button };
