import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import {
  ArrowForwardIosOutlined,
  ExpandMore as ExpandMoreIcon,
  PushPin,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ClickAwayListener,
  IconButton,
  styled,
} from '@mui/material';

import { dmeConfig } from '../../config';
import { i18n } from '../../i18n';
import type { DME } from '../../types/dmeditor';
import {
  customDefinition,
  getWidgetStyle,
  getWidgetStyles,
  layoutDefinition,
  widgetDefinition,
  widgetStyles,
} from '../../utils/register';
import { SvgIcon } from '../icon';
import { PropertyTab } from '../property-tab';
import Dot from './dot.svg';
import {
  StyleTabBody,
  StyleWidgetItem,
  StyleWidgetItemText,
  StyleWidgetList,
  StyleWidgetStyleItem,
  StyleWidgetStyleList,
} from './styled';

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

interface WidgetListProps {
  filter?: Array<string> | string;
  onSelect: (type: string, addData: { style?: string; savedBlock?: any }) => void;
}

const CateoryAccordion = styled(Accordion)(({ theme }) => {
  return {
    boxShadow: 'none',
    '.Mui-expanded.MuiAccordionSummary-root': { minHeight: 0 },
    '.MuiAccordionSummary-root': {
      padding: 0,
      height: 30,
      minHeight: 0,
      backgroundColor: 'var(--dmee-bg-sidearea)',
    },
    '.Mui-expanded.MuiAccordionSummary-content': {
      margin: '10px 0px',
      display: 'flex',
      alignItems: 'center',
    },
    '.MuiAccordionDetails-root': {
      padding: '0px 5px',
      color: '#666666',
      backgroundColor: 'var(--dmee-bg-sidearea)',
    },
  };
});

export const WidgetList = (props: WidgetListProps) => {
  const { filter } = props;

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

  const groupedWidgets = useMemo(() => {
    const categories = dmeConfig.editor.categories;
    const result: { category: DME.WidgetCategory; widgets: DME.Widget[] }[] = [];

    categories.forEach((category) => {
      const widgets = Object.keys(definitions)
        .filter(
          (widget) => definitions[widget].category === category.identifier && matchFilter(widget),
        )
        .map((widget) => definitions[widget]);

      result.push({ category, widgets });
    });

    result.unshift({
      category: { identifier: 'pinned', name: 'Pinned' },
      widgets: Object.keys(definitions)
        .filter(
          (widget) => dmeConfig.editor.favouriteWidgets.includes(widget) && matchFilter(widget),
        )
        .map((widget) => definitions[widget]),
    });

    return result;
  }, [definitions]);

  const preDefinedStyles = useMemo(() => {
    const result: { [widget: string]: Array<DME.WidgetStyleOption> } = {};
    Object.keys(widgetStyles).forEach((widget) => {
      const styleOptions = getWidgetStyle(widget).options;
      result[widget] = styleOptions;
    });
    return result;
  }, [widgetStyles]);

  const filterVariant = (widget: string) => {
    const variants = widgetDefinition[widget].variants;
    const result = variants.filter((item) => matchFilter(widget + ':' + item.identifier));
    return result;
  };

  return (
    <StyleTabBody>
      {groupedWidgets.map(({ category, widgets }) =>
        widgets.length > 0 ? (
          <CateoryAccordion key={category.identifier} defaultExpanded={true}>
            <AccordionSummary>
              {category.identifier === 'pinned' ? (
                <PushPin style={{ fontSize: 18 }} />
              ) : (
                <ArrowForwardIosOutlined style={{ fontSize: 15 }} />
              )}
              {category.name}
            </AccordionSummary>
            <AccordionDetails>
              <StyleWidgetList>
                {widgets.map((widget, index) => (
                  <WidgetItem widget={widget} onSelect={props.onSelect} index={index} />
                ))}
              </StyleWidgetList>
            </AccordionDetails>
          </CateoryAccordion>
        ) : (
          <></>
        ),
      )}
    </StyleTabBody>
  );
};

const WidgetItem = (props: {
  widget: DME.Widget;
  index: number;
  onSelect?: (widget: string, addData: { style?: string; savedBlock?: any }) => void;
}) => {
  const COLUMN_COUNT = 2;
  const { widget, onSelect, index } = props;
  const row = Math.floor(index / COLUMN_COUNT);
  const { name, icon } = widget;
  const styles = getWidgetStyle(widget.type);
  const styleOptions = styles.options.filter((option) => !option.identifier.startsWith('_'));
  const savedBlockData = useMemo(() => {
    if (!dmeConfig.callbacks.getSavedBlocks) {
      return [];
    }
    return dmeConfig.callbacks.getSavedBlocks(widget.type);
  }, [widget.type]);
  const multipleStyles = styleOptions.length > 0 || savedBlockData.length > 0;

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWidgetSelect = () => {
    onSelect?.(widget.type, {});
  };

  return (
    <>
      <StyleWidgetItem active={open} onClick={handleWidgetSelect}>
        <div>{icon && SvgIcon({ name: icon as string, size: 20 })}</div>
        <div title={name} className={StyleWidgetItemText} style={{ flexGrow: 1 }}>
          {name}
        </div>
        {multipleStyles && (
          <IconButton size="small" onClick={handleClick} sx={{ ml: 0 }} title="Customized">
            <Dot />
          </IconButton>
        )}
      </StyleWidgetItem>
      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <StyleWidgetStyleList row={row}>
            {styleOptions.map((style) => (
              <StyleWidgetStyleItem.Main
                onClick={() => onSelect?.(widget.type, { style: style.identifier })}
                key={style.identifier}
              >
                {style.icon && (
                  <StyleWidgetStyleItem.Image>
                    <img src={style.icon} />
                  </StyleWidgetStyleItem.Image>
                )}
                <StyleWidgetStyleItem.Name>{style.name}</StyleWidgetStyleItem.Name>
              </StyleWidgetStyleItem.Main>
            ))}
            {savedBlockData.map((item) => (
              <StyleWidgetStyleItem.Main
                key={item.name}
                onClick={() => onSelect?.(widget.type, { savedBlock: item.savedData })}
              >
                {item.image && (
                  <StyleWidgetStyleItem.Image>
                    <img src={item.image} />
                  </StyleWidgetStyleItem.Image>
                )}
                <StyleWidgetStyleItem.Name>{item.name}</StyleWidgetStyleItem.Name>
              </StyleWidgetStyleItem.Main>
            ))}
          </StyleWidgetStyleList>
        </ClickAwayListener>
      )}
    </>
  );
};
