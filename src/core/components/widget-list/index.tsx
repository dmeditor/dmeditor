import { useMemo } from 'react';
import { css } from '@emotion/css';
import { ArrowForwardIosOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { dmeConfig } from '../../config';
import { i18n } from '../../i18n';
import type { DME } from '../../types/dmeditor';
import {
  customDefinition,
  getWidgetStyle,
  layoutDefinition,
  widgetDefinition,
  widgetStyles,
} from '../../utils/register';
import { SvgIcon } from '../icon';
import { PropertyTab } from '../property-tab';
import { StyleTabBody } from './styled';

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
  align-items: center;

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
    <PropertyTab
      tabs={[
        {
          title: i18n('Common'),
          element: (
            <StyleTabBody>
              {dmeConfig.editor.favouriteWidgets.map((widgetType) => {
                const arr = widgetType.split(':');
                if (arr.length === 1) {
                  return (
                    <MenuItem
                      icon={definitions[widgetType].icon}
                      widget={widgetType}
                      name={definitions[widgetType].name}
                      baseName=""
                      onClick={() => props.onSelect(widgetType)}
                    />
                  );
                } else {
                  return (
                    <MenuItem
                      icon={definitions[arr[0]].icon}
                      widget={widgetType}
                      name={
                        widgetDefinition[arr[0]].variants.find((item) => item.identifier === arr[1])
                          ?.name || ''
                      }
                      baseName=""
                      onClick={() => props.onSelect(widgetType)}
                    />
                  );
                }
              })}
            </StyleTabBody>
          ),
        },
        {
          title: 'Widgets',
          element: (
            <StyleTabBody>
              {dmeConfig.editor.categories.map((category) => (
                <div>
                  <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>
                    <ArrowForwardIosOutlined style={{ fontSize: 12 }} /> {category.name}
                  </div>
                  <div>
                    {Object.keys(definitions)
                      .filter((widget) => matchFilter(widget))
                      .map((widgetType) =>
                        definitions[widgetType].category === category.identifier ? (
                          <MenuItem
                            icon={definitions[widgetType].icon}
                            widget={widgetType}
                            name={definitions[widgetType].name}
                            baseName=""
                            onClick={() => props.onSelect(widgetType)}
                          />
                        ) : (
                          <></>
                        ),
                      )}
                    <div className={space} />
                    {Object.keys(widgetDefinition).map((widget) =>
                      filterVariant(widget).map((variant) =>
                        variant.category === category.identifier ? (
                          <MenuItem
                            widget={widget + ':' + variant.identifier}
                            icon={widgetDefinition[widget].icon}
                            name={variant.name}
                            baseName={widgetDefinition[widget].name}
                            onClick={() => props.onSelect(widget + ':' + variant.identifier)}
                          />
                        ) : (
                          <></>
                        ),
                      ),
                    )}
                  </div>
                </div>
              ))}

              <div className={moreWidget}>
                <Button variant="outlined">
                  Add more <ChevronRightOutlined />
                </Button>
              </div>
            </StyleTabBody>
          ),
        },
      ]}
    />
  );
};

const MenuItem = (props: {
  icon?: any;
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
