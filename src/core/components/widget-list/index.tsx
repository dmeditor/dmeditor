import { useMemo } from 'react';
import { css } from '@emotion/css';
import {
  ArrowRightOutlined,
  ChevronRightOutlined,
  FormatColorText,
  Title,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { customDefinition, getWidget, layoutDefinition, widgetDefinition } from '../widgets';

//internal css: emotion
//extendable css: class - dme-block-text
//theme related: css variable

const itemStyle = css`
  display: flex;
  border-bottom: 1px solid #dddddd;
  padding: 8px 5px;
  cursor: pointer;
  overflow-x: hidden;
  border: 1px solid #f0f0f0;

  &:hover {
    background: #f0f0f0;
  }
`;

const moreWidget = css`
  margin-top: 10px;
  padding: 10px;
  text-align: center;
`;

interface WidgetListProps {
  filter?:Array<string>|string;
  onSelect: (type: string) => void;
}

export const WidgetList = (props: WidgetListProps) => {
  const {filter} = props;

  const definitions = useMemo(() => {
    // widgetDefinition is the default definition and it is not empty
    const customDefinitionLength = Object.keys(customDefinition).length;
    const layoutDefinitionLength = Object.keys(layoutDefinition).length;

    if (customDefinitionLength === 0 && layoutDefinitionLength === 0) {
      return widgetDefinition;
    } else if (customDefinitionLength === 0) {
      return { ...widgetDefinition, ...layoutDefinition };
    } else if (layoutDefinitionLength === 0) {
      return { ...widgetDefinition, ...customDefinition };
    } else {
      return { ...widgetDefinition, ...customDefinition, ...layoutDefinition };
    }
  }, [customDefinition, layoutDefinition, widgetDefinition]);

  const matchFilter = (widget:string) =>{
    if(!filter){
      return true;
    }
    if(typeof filter === 'string'){
      return widget.match(filter);
    }else{ // arrary
      return filter.includes(widget);
    }
  }

  const filterVariant = (widget:string)=>{
    const variants = widgetDefinition[widget].variants;
    const result = variants.filter(item=>matchFilter(widget+':'+item.identifier));
    return result;
  }

  return (
    <div>
      {Object.keys(definitions).filter(widget=>matchFilter(widget)).map((widgetType) => (
        definitions[widgetType]).isBaseWidget?<></>:
        <div className={itemStyle} onClick={() => props.onSelect(widgetType)}>
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
            {definitions[widgetType].name}
          </div>
        </div>
      )}

      {Object.keys(widgetDefinition).map( widget=>filterVariant(widget).map((variant)=>
      <div className={itemStyle} onClick={() => props.onSelect(widget+':'+variant.identifier)}>
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
        <span>{variant.name}</span>        
        <span className={css`
          color: #999999;
          margin-left: 5px;
          font-size: 0.9rem;
        `}>{widgetDefinition[widget].name}</span>
      </div>
    </div>
      
      ))}

      <div className={moreWidget}>
        <Button variant="outlined">
          Add more <ChevronRightOutlined />
        </Button>
      </div>
    </div>
  );
};
