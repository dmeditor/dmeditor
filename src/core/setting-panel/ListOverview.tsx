import { css } from '@emotion/css';
import { DragIndicator, KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidgetWithVariant } from '../../core/utils';
import { useEditorStore } from '../main/store';
import { DMEData } from '../types/dmeditor';

interface ListOverviewProps {
  data: DMEData.BlockList;
  selectedIndex: number;
}

const activeRow = `
  background: #f7f7f7;
`;

const tableStyle = `
  width: 100%;
  border-spacing: 0px;

  td {
    border-bottom: 1px solid #f0f0f0;
    padding: 5px;
  }
`;

const trStyle = `
  &:hover{
    outline: 1px solid #ffb8b8;
  }
`;

export const ListOverview = (props: ListOverviewProps) => {
  const { updateSelectedBlockIndex, updateHoverPath } = useEditorStore();

  const getName = (type: string) => {
    const [widget, variant] = getWidgetWithVariant(type);
    if (variant) {
      return variant.name;
    }
    return widget?.name || '';
  };

  const jumpTo = (index: number) => {
    updateSelectedBlockIndex([index], props.data[index].id || '');
  };

  const hover = (index: number) => {
    if (index === -1) {
      updateHoverPath([]);
    } else {
      updateHoverPath([index]);
    }
  };

  return (
    <div>
      <table className={css(tableStyle)}>
        <tbody>
          {props.data.map((item, index) => (
            <tr
              key={item.id}
              className={css(trStyle) + ' ' + (props.selectedIndex === index ? css(activeRow) : '')}
              onMouseEnter={() => hover(index)}
              onMouseOut={() => hover(-1)}
            >
              <td
                className={css`
                  width: 40;
                `}
              >
                <Button sx={{ cursor: 'move' }}>
                  <DragIndicator />
                </Button>
              </td>
              <td
                className={css`
                  cursor: default;
                `}
              >
                {getName(item.type)}
              </td>
              <td
                className={css`
                  width: 40;
                `}
              >
                <Button onClick={() => jumpTo(index)}>
                  <KeyboardArrowRight />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
