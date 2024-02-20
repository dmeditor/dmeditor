import { css } from '@emotion/css';
import { DragIndicator, KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidgetWithVariant } from '../components/widgets';
import { DMEData } from '../types/dmeditor';
import { useEditorStore } from '../main/store';

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
  const {updateSelectedBlockIndex} = useEditorStore();

  const getName = (type:string)=>{
      const [widget, variant] = getWidgetWithVariant(type);
      if(variant){
        return variant.name;
      }
      return widget?.name||'';
  }


  const jumpTo = (index:number)=>{
    updateSelectedBlockIndex([], index, props.data[index].id||'')
  }

  return (
    <div>
      <table className={tableStyle}>
        <tbody>
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
            <td>{getName(item.type)}</td>
            <td
              className={css`
                width: 40;
              `}
            >
              <Button onClick={()=>jumpTo(index)}>
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
