import { css } from '@emotion/css';

import { DME, useEditorStore } from '../../../..';

const POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
type Position = (typeof POSITIONS)[number];

const SIZE = 26;
const T = 3;

const EXTRA = 4;

const hitArea: Record<Position, object> = {
  top: { top: -EXTRA, left: 0, right: 0, bottom: -EXTRA },
  bottom: { bottom: -EXTRA, left: 0, right: 0, top: -EXTRA },
  left: { left: -EXTRA, top: 0, bottom: 0, right: -EXTRA },
  right: { right: -EXTRA, top: 0, bottom: 0, left: -EXTRA },
};

const sideClass = (pos: Position, active: boolean) => {
  const color = active ? '#666666' : '#dddddd';
  const base = {
    position: 'absolute' as const,
    cursor: 'pointer',
    backgroundColor: color,
    '&:hover': { opacity: 0.7 },
    '&::after': {
      content: '""',
      position: 'absolute',
      ...hitArea[pos],
    },
  };
  const dims = {
    top: { top: 0, left: 0, right: 0, height: T },
    bottom: { bottom: 0, left: 0, right: 0, height: T },
    left: { top: 0, left: 0, bottom: 0, width: T },
    right: { top: 0, right: 0, bottom: 0, width: T },
  }[pos];
  return css({ ...base, ...dims });
};

const BorderPosition = (
  props: DME.SettingComponentProps & {
    property: string;
    value: Position[];
    parameters: any;
  },
) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const selected: Position[] = Array.isArray(value) ? value : POSITIONS.slice();

  const toggle = (pos: Position) => {
    const next = selected.includes(pos) ? selected.filter((p) => p !== pos) : [...selected, pos];
    console.log('next', next);
    updateBlockPropsByPath(blockPath, property, next);
  };

  return (
    <div
      className={css({
        position: 'relative',
        width: SIZE,
        marginLeft: 10,
        height: SIZE,
        flexShrink: 0,
      })}
    >
      {POSITIONS.map((pos) => (
        <div
          key={pos}
          title={pos.charAt(0).toUpperCase() + pos.slice(1)}
          className={sideClass(pos, selected.includes(pos))}
          onClick={() => toggle(pos)}
        />
      ))}
    </div>
  );
};

export default BorderPosition;
