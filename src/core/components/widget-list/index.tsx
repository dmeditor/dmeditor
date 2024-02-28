import { useMemo } from 'react';
import { css } from '@emotion/css';
import {
  ArrowRightOutlined,
  ChevronRightOutlined,
  FormatColorText,
  Title,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { SvgIcon } from '../icon';
import {
  customDefinition,
  getWidget,
  getWidgetName,
  getWidgetStyle,
  layoutDefinition,
  widgetDefinition,
  widgetStyles,
} from '../widgets';
import { DME } from 'Src/core/types/dmeditor';

//internal css: emotion
//extendable css: class - dme-block-text
//theme related: css variable

const space = css`
  height: 5px;
  border-radius: 4px;
  background-color: #fff5f5;
`;

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
  filter?: Array<string> | string;
  onSelect: (type: string, style?: string) => void;
}

export const WidgetList = (props: WidgetListProps) => {
  const { filter } = props;

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

  const preDefinedStyles = useMemo(() => {
    const result: { [widget: string]: Array<DME.WidgetStyleOption> } = {};
    Object.keys(widgetStyles).forEach((widget) => {
      const styleOptions = getWidgetStyle(widget).options;
      result[widget] = styleOptions;
    });
    return result;
  }, [widgetStyles]);

  const matchFilter = (widget: string) => {
    if (!filter) {
      return true;
    }
    if (typeof filter === 'string') {
      return widget.match(filter);
    } else {
      // array
      return filter.includes(widget);
    }
  };

  const filterVariant = (widget: string) => {
    const variants = widgetDefinition[widget].variants;
    const result = variants.filter((item) => matchFilter(widget + ':' + item.identifier));
    return result;
  };

  return (
    <div>
      {Object.keys(definitions)
        .filter((widget) => matchFilter(widget))
        .map((widgetType) =>
          definitions[widgetType].isBaseWidget ? null : (
            <MenuItem
              icon={definitions[widgetType].icon}
              widget={widgetType}
              name={definitions[widgetType].name}
              baseName=""
              onClick={() => props.onSelect(widgetType)}
            />
          ),
        )}
      <div className={space} />
      {Object.keys(widgetDefinition).map((widget) =>
        filterVariant(widget).map((variant) => (
          <MenuItem
            widget={widget + ':' + variant.identifier}
            name={variant.name}
            baseName={widgetDefinition[widget].name}
            onClick={() => props.onSelect(widget + ':' + variant.identifier)}
          />
        )),
      )}
      <div className={space} />

      {Object.keys(preDefinedStyles).map((widget) =>
        preDefinedStyles[widget].map((option) => (
          <MenuItem
            widget={widget}
            name={option.name}
            baseName={getWidgetName(widget)}
            onClick={() => props.onSelect(widget, option.identifier)}
          />
        )),
      )}

      <div className={moreWidget}>
        <Button variant="outlined">
          Add more <ChevronRightOutlined />
        </Button>
      </div>
    </div>
  );
};

const MenuItem = (props: {
  icon?: string;
  widget: string;
  name: string;
  baseName: string;
  onClick: () => void;
}) => {
  const { icon, widget, name, baseName, onClick } = props;

  return (
    <div className={itemStyle} onClick={onClick}>
      <div
        className={css`
          width: 30px;
        `}
      >
        {icon && SvgIcon({ name: icon, size: 20 })}
      </div>
      <div
        className={css`
          color: #666666;
        `}
      >
        <span>{name}</span>
        {baseName && (
          <span
            className={css`
              color: #999999;
              margin-left: 5px;
              font-size: 0.9rem;
            `}
          >
            {baseName}
          </span>
        )}
      </div>
    </div>
  );
};
