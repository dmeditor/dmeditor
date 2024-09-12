import type { DME } from '../..';
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
        className={props.styleClasses['line-item'] || 'dme-w-line-item'}
        spaceHeight={settings?.height || 2}
        spaceColor={settings?.color}
      ></StyledLine>
    </div>
  );
};

export { Line };
