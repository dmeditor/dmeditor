import { css } from '@emotion/css';
import { DragIndicator, KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import { DMEData } from '../components/types/blocktype';

interface BlockListProps {
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

export const BlockList = (props: BlockListProps) => {
  return (
    <div>
      <table className={tableStyle}>
        {props.data.map((item, index) => (
          <tr key={item.id} className={props.selectedIndex === index ? activeRow : ''}>
            <td>
              <Button sx={{ cursor: 'move' }}>
                <DragIndicator />
              </Button>
            </td>
            <td className={css`
              width: 60%
            `}>{item.type}</td>
            <td><Button><KeyboardArrowRight /></Button></td>
          </tr>
        ))}
      </table>
    </div>
  );
};
