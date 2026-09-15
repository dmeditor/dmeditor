import type { DME } from '../..';
import { getWidgetStyleClass } from '../../core/utils';
import { EntityLine } from './entity';
import { StyledLine } from './styled';

const Line = (props: DME.WidgetRenderProps<EntityLine>) => {
  const {
    blockNode: {
      data: { settings },
    },
  } = props;

  return (
    <div>
      <StyledLine
        className={getWidgetStyleClass(props.styleClasses, 'line-item')}
        spaceHeight={settings?.height || 2}
        spaceColor={settings?.color}
      ></StyledLine>
    </div>
  );
};

export { Line };
