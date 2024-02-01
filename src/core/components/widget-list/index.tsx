import { useMemo } from 'react';
import { css } from '@emotion/css';
import {
  ArrowRightOutlined,
  ChevronRightOutlined,
  FormatColorText,
  Title,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { customDefinition, layoutDefinition, widgetDefinition } from '../widgets';

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
  onSelect: (type: string) => void;
}

export const WidgetList = (props: WidgetListProps) => {
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

  return (
    <div>
      {Object.keys(definitions).map((widgetType) => (
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
      ))}

      <div className={moreWidget}>
        <Button variant="outlined">
          Add more <ChevronRightOutlined />
        </Button>
      </div>
    </div>
  );
};
