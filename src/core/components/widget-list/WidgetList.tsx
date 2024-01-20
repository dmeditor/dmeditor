import { css } from '@emotion/css';
import { FormatColorText, Title } from '@mui/icons-material';

import widgets from '../widgets';


  //internal css: emotion
  //extendable css: class - dme-block-text
  //theme related: css variable

const itemStyle = css`
  display: flex;
  border-bottom: 1px solid #dddddd;
  padding: 8px 5px;
  cursor: pointer;
  overflow-x: hidden;

  &:hover{
    background: #f0f0f0;
  }
`;

interface WidgetListProps{
  onSelect: (type:string)=>void
}

export const WidgetList = (props:WidgetListProps) => {
  return (
    <div>
      {Object.keys(widgets).map((widget) => (
        <div className={itemStyle} onClick={()=>props.onSelect(widget)}>
          <div
            className={css`
              width: 30px;
            `}
          >
            <Title />
          </div>
          <div
            className={css`
              color: #666666;
            `}
          >
            {widget}
          </div>
        </div>
      ))}
    </div>
  );
};
