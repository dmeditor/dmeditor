import { css } from '@emotion/css';
import { DragIndicator, KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import { DMEData } from '../components/types/block';
import { getWidget } from '../components/widgets';

interface ListOverviewProps {
  data: DMEData.BlockList;
  selectedIndex: number;
}

const activeRow = css`
  background: #f7f7f7;
`;

const tableStyle = css`
  width: 100%;
  border-spacing: 0px;

  td {
    border-bottom: 1px solid #f0f0f0;
    padding: 5px;
  }
`;

export const ListOverview = (props: ListOverviewProps) => {
  return (
    <div>
      <table className={tableStyle}>
        {props.data.map((item, index) => (
          <tr key={item.id} className={props.selectedIndex === index ? activeRow : ''}>
            <td
              className={css`
                width: 40;
              `}
            >
              <Button sx={{ cursor: 'move' }}>
                <DragIndicator />
              </Button>
            </td>
            <td>{getWidget(item.type)?.name}</td>
            <td
              className={css`
                width: 40;
              `}
            >
              <Button>
                <KeyboardArrowRight />
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
