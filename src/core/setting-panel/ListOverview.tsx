import { css } from '@emotion/css';
import { AddOutlined, DragIndicator, KeyboardArrowRight, PlusOne } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { getWidgetWithVariant, scrollBlockToView } from '../../core/utils';
import { useEditorStore } from '../main/store';
import { DMEData } from '../types/dmeditor';

interface ListOverviewProps {
  data: DMEData.BlockList;
  blockPath: Array<number>;
  selectedIndex: number;
}

const activeRow = `
  background: #f7f7f7;
`;

const tableStyle = `
  width: 100%;
  border-spacing: 0px;

  td {
    padding: 5px;
  }
`;

const trStyle = `
  &:hover{
    outline: 1px solid #ffb8b8;
  }
`;

export const ListOverview = (props: ListOverviewProps) => {
  const { blockPath, data } = props;
  const { updateSelectedBlockIndex, updateHoverPath, startAddBlock } = useEditorStore();

  const getName = (type: string) => {
    const [widget, variant] = getWidgetWithVariant(type);
    if (variant) {
      return variant.name;
    }
    return widget?.name || '';
  };

  const jumpTo = (index: number) => {
    const id = props.data[index].id || '';
    updateSelectedBlockIndex([...blockPath, index], id);
    scrollBlockToView(id);
  };

  const hover = (index: number) => {
    if (index === -1) {
      updateHoverPath([]);
    } else {
      updateHoverPath([...blockPath, index]);
    }
  };

  const addUnder = () => {
    startAddBlock(blockPath, data.length - 1, 'after', {});
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
                  width: 50px;
                `}
              >
                <Button sx={{ cursor: 'move' }}>
                  <DragIndicator />
                </Button>
              </td>
              <td
                className={css`
                  cursor: pointer;
                `}
                onClick={() => jumpTo(index)}
              >
                {getName(item.type)}
              </td>
              <td
                className={css`
                  cursor: pointer;
                  text-align: right;
                  padding-right: 20px !important;
                `}
                onClick={() => jumpTo(index)}
              >
                <KeyboardArrowRight />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={css`
          text-align: center;
        `}
      >
        <IconButton title="Add under" onClick={() => addUnder()}>
          <AddOutlined />
        </IconButton>
      </div>
    </div>
  );
};
