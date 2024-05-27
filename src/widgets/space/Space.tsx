import type { DME } from '../..';
import { EntitySpace } from './entity';
import { StyledSpace } from './styled';

const Space = (props: DME.WidgetRenderProps<EntitySpace>) => {
  const {
    blockNode: {
      data: { settings },
    },
    rootClasses,
  } = props;

  return (
    <StyledSpace spaceHeight={settings?.height || 2}>
      <div className={props.styleClasses['space-item'] || 'dme-w-space-item'}></div>
    </StyledSpace>
  );
};

export { Space };
