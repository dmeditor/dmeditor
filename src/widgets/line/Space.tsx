import type { DME } from '../..';
import { EntityLine } from './entity';
import { StyledSpace } from './styled';

const Space = (props: DME.WidgetRenderProps<EntityLine>) => {
  const {
    blockNode: {
      data: { settings },
    },
    rootClasses,
  } = props;

  return (
    <div>
      <StyledSpace
        className={props.styleClasses['space-item'] || 'dme-w-space-item'}
        spaceHeight={settings?.height || 2}
        spaceColor={settings?.color}
      ></StyledSpace>
    </div>
  );
};

export { Space };
