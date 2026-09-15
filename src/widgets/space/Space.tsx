import type { DME } from '../..';
import { getWidgetStyleClass } from '../../core/utils';
import { EntitySpace } from './entity';
import { StyledSpace } from './styled';

const Space = (props: DME.WidgetRenderProps<EntitySpace>) => {
  const {
    blockNode: {
      data: { settings },
    },
  } = props;

  return (
    <StyledSpace spaceHeight={settings?.height || 2}>
      <div className={getWidgetStyleClass(props.styleClasses, 'space-item')}></div>
    </StyledSpace>
  );
};

export { Space };
