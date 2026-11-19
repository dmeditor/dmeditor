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
    <div style={settings?.vertical ? { display: 'flex', height: '100%' } : undefined}>
      <StyledLine
        className={getWidgetStyleClass(props.styleClasses, 'line-item')}
        spaceHeight={settings?.height || 2}
        spaceColor={settings?.color}
        vertical={settings?.vertical}
      ></StyledLine>
    </div>
  );
};

export { Line };
