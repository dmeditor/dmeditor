import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { AddBoxOutlined, CancelOutlined, DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import _debounce from 'lodash/debounce';

import i18n from '../../../locales/i18n';
import { getDef } from '../../../ToolDefinition';
import { BlockProperty } from '../../components/block-property';
import { getWidgetComponent } from '../../components/widgets';
import { Heading } from '../../components/widgets/heading';
import { MenuList } from '../../components/widgets/menu-list';
import { PropertyButton } from '../../utils';
import { Util } from '../../utils/utilx';
import { StyledBlock } from './styled';
import type { DMEData } from 'Core/types';

export type BlockInfo = {
  type: string;
  content?: any;
  settings?: any;
};

interface BlockProps {
  data: DMEData.Block;
  active?: boolean;
  onActivate?: () => void;
  onAddAbove?: (type: string, template?: string) => void;
  onAddUnder?: (type: string, template?: string) => void;
  onCancel?: () => void;
  view?: boolean;
  inBlock?: boolean;
  newBlock?: boolean;
  addedType?: string[];
  //undefined means can not have sibling
  siblingDirection?: 'vertical' | 'horizontal';
  onDelete?: () => void;
}

export const BlockRender = React.memo((props: BlockProps) => {
  const [isActive, setIsActive] = useState(props.active ? true : false);
  const [addUnder, setAddUnder] = useState(0);

  useEffect(() => {
    setIsActive(props.active ? true : false);
  }, [props.active]);

  const startAdd = (under: number) => {
    setAddUnder(under);
  };

  const addBlock = (type: string, template?: string) => {
    if (addUnder > 0 && props.onAddUnder) {
      props.onAddUnder(type, template);
    }

    if (addUnder < 0 && props.onAddAbove) {
      props.onAddAbove(type, template);
    }
  };

  const Widget = getWidgetComponent(props.data.type);

  return Widget ? (
    <Widget
      adding={props.newBlock}
      inBlock={props.inBlock ? true : false}
      blockNode={props.data}
      active={isActive}
      onCancel={props.onCancel}
      onDelete={props.onDelete}
    />
  ) : (
    <></>
  );

  // return (
  //   <div
  //     className={
  //       'dme-block-container' + (props.inBlock ? ' inblock' : '')
  //     }
  //   >
  //     {selectingTool && (
  //       <RenderMenu
  //         onAdd={addBlock}
  //         onCancel={() => setSelectingTool(false)}
  //         allowedType={props.addedType}
  //       />
  //     )}
  //     {!props.view && props.siblingDirection === 'vertical' && (
  //       <div className="tool tool-above">
  //         <a
  //           className="tool-item"
  //           href="/"
  //           title={getTitle()}
  //           // title={i18n.t('Add above ') + i18n.t(def.name, { ns: 'blocktype' })}
  //           onClick={(e) => {
  //             e.preventDefault();
  //             e.stopPropagation();
  //             startAdd(-1);
  //           }}
  //         >
  //           <AddBoxOutlined />
  //         </a>
  //       </div>
  //     )}
  //     {!props.view && <>{Util.renderPreBlock({ blockData: props.data })}</>}

  //     {!props.view && props.siblingDirection === 'vertical' && (
  //       <div className="tool tool-under">
  //         <a
  //           className="tool-item"
  //           href="/"
  //           title={getTitle()}
  //           // title={i18n.t('Add under ') + i18n.t(def.name, { ns: 'blocktype' })}
  //           onClick={(e) => {
  //             e.preventDefault();
  //             e.stopPropagation();
  //             startAdd(1);
  //           }}
  //         >
  //           <AddBoxOutlined />
  //         </a>
  //       </div>
  //     )}
  //   </div>
  // );
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
