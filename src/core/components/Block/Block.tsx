import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { AddBoxOutlined, CancelOutlined, DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import _debounce from 'lodash/debounce';

import i18n from '../../../locales/i18n';
import { getDef } from '../../../ToolDefinition';
import { PropertyButton } from '../../utils';
import { Util } from '../../utils/utilx';
import { BlockProperty } from '../block-property';
import WidgetList from '../widgets';
import { Heading } from '../widgets/heading';
import { MenuList } from '../widgets/menu-list';

export type BlockInfo = {
  type: string;
  content?: any;
  settings?: any;
};

interface BlockProps {
  data: any;
  active?: boolean;
  onActivate?: () => void;
  onAddAbove?: (type: string, template?: string) => void;
  onAddUnder?: (type: string, template?: string) => void;
  onChange: (data: any) => void;
  onCancel?: () => void;
  view?: boolean;
  inBlock?: boolean;
  newBlock?: boolean;
  addedType?: string[];
  //undefined means can not have sibling
  siblingDirection?: 'vertical' | 'horizontal';
  onDelete?: () => void;
}

// TODO:
const Widget = (props: unknown) => {};

export const Block = React.memo((props: BlockProps) => {
  const [selectingTool, setSelectingTool] = useState(false); //just for rerender purpose
  const [isActive, setIsActive] = useState(props.active ? true : false);
  const [addUnder, setAddUnder] = useState(0);

  useEffect(() => {
    if (!props.active) {
      setSelectingTool(false);
    }
    setIsActive(props.active ? true : false);
  }, [props.active]);

  const activeBlock = () => {
    if (props.onActivate && !isActive) {
      props.onActivate();
    }
  };

  const onDataChange = (data: any, debounce?: boolean) => {
    if (debounce) {
      debounceSave(data);
    } else {
      props.onChange(data);
    }
  };
  const debounceSave = useCallback(
    _debounce((data: any) => {
      props.onChange(data);
    }, 500),
    [],
  );

  const startAdd = (under: number) => {
    setSelectingTool(true);
    setAddUnder(under);
  };

  const addBlock = (type: string, template?: string) => {
    if (addUnder > 0 && props.onAddUnder) {
      props.onAddUnder(type, template);
    }

    if (addUnder < 0 && props.onAddAbove) {
      props.onAddAbove(type, template);
    }
    setSelectingTool(false);
  };

  const def = getDef(props.data.type);
  const getWidget = (type: string) => {
    const widget = WidgetList[type];
    if (widget) {
      return widget;
    } else {
      return null;
    }
  };

  const Widget = getWidget(props.data.type);

  const render = () => {
    if (def) {
      return (
        <>
          {props.view && (
            <def.render
              view={true}
              inBlock={props.inBlock ? true : false}
              onChange={() => {}}
              blockdata={props.data}
              active={false}
            />
          )}
          {!props.view && (
            <def.render
              adding={props.newBlock}
              inBlock={props.inBlock ? true : false}
              onChange={(data: any, debounce?: boolean) => {
                onDataChange(data, debounce);
              }}
              blockdata={props.data}
              active={isActive}
              onCancel={props.onCancel}
              onDelete={props.onDelete}
            />
          )}
        </>
      );
    } else {
      // return 'Unknown type:' + props.data.type;
      return (
        <Widget
          adding={props.newBlock}
          inBlock={props.inBlock ? true : false}
          onChange={(data: any, debounce?: boolean) => {
            onDataChange(data, debounce);
          }}
          blockdata={props.data}
          active={isActive}
          onCancel={props.onCancel}
          onDelete={props.onDelete}
        />
      );
    }
  };

  const getTitle = () => {
    if (def?.name) {
      return i18n.t('Add above ') + i18n.t(def.name, { ns: 'blocktype' });
    } else {
      Object.entries(WidgetList).forEach(([key, value]) => {
        if (value) {
          return i18n.t('Add above ') + i18n.t(key, { ns: 'blocktype' });
        }
      });
    }
  };

  return (
    <div
      className={
        'dme-block-container' + (isActive ? ' active' : '') + (props.inBlock ? ' inblock' : '')
      }
      id={props.data.id}
      onClick={(e: any) => activeBlock()}
    >
      {selectingTool && (
        <RenderMenu
          onAdd={addBlock}
          onCancel={() => setSelectingTool(false)}
          allowedType={props.addedType}
        />
      )}
      {!props.view && props.siblingDirection === 'vertical' && (
        <div className="tool tool-above">
          <a
            className="tool-item"
            href="/"
            title={getTitle()}
            // title={i18n.t('Add above ') + i18n.t(def.name, { ns: 'blocktype' })}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startAdd(-1);
            }}
          >
            <AddBoxOutlined />
          </a>
        </div>
      )}
      {!props.view && <>{Util.renderPreBlock({ blockData: props.data })}</>}

      {render()}

      {!props.view && props.siblingDirection === 'vertical' && (
        <div className="tool tool-under">
          <a
            className="tool-item"
            href="/"
            title={getTitle()}
            // title={i18n.t('Add under ') + i18n.t(def.name, { ns: 'blocktype' })}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startAdd(1);
            }}
          >
            <AddBoxOutlined />
          </a>
        </div>
      )}
    </div>
  );
});

export const RenderMenu = (props: {
  onAdd: (type: string, template?: string) => void;
  onCancel: () => void;
  allowedType?: string[];
}) => {
  const menuRoot = document.getElementById('dmeditor-add-menu');

  return menuRoot ? (
    ReactDOM.createPortal(
      <div>
        <div style={{ float: 'right', marginRight: '5px' }}>
          <Button onClick={props.onCancel}>
            <CancelOutlined />
          </Button>
        </div>
        <MenuList
          allowedType={props.allowedType}
          onSelect={(type: string, template?: string) => {
            if (props.onAdd) {
              props.onAdd(type, template);
            }
          }}
        />
      </div>,
      menuRoot as HTMLElement,
    )
  ) : (
    <></>
  );
};

export const getStyleCss = (blocktype: string, styleIdentifier?: string) => {
  let def = getDef(blocktype);
  let styleCss = '';
  if (styleIdentifier && def.styles) {
    const styleDef = def.styles[styleIdentifier];
    if (styleDef) {
      if (styleDef.css) {
        styleCss = styleDef.css;
      }
    } else {
      console.warn('Style ' + styleIdentifier + ' not found.');
    }
  }
  return styleCss;
};

export const getCommonBlockCss = (blockType: string, styleIdentifier?: string) => {
  let result = 'dme-block dme-blocktype-' + blockType;
  if (styleIdentifier) {
    result += ' dme-template-' + blockType + '-' + styleIdentifier;
    result += ' ' + getStyleCss(blockType, styleIdentifier);
  }
  return result;
};
