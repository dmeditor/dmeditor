import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { AddBoxOutlined, CancelOutlined, DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import _debounce from 'lodash/debounce';

import i18n from '../../../locales/i18n';
import { getDef } from '../../../ToolDefinition';
import { BlockProperty } from '../../components/block-property';
import { getWidgetComponent, getWidgetStyle, getWidgetVariant } from '../../components/widgets';
import { Heading } from '../../components/widgets/heading';
import { MenuList } from '../../components/widgets/menu-list';
import { PropertyButton } from '../../utils';
import { Util } from '../../utils/utilx';
import { StyledBlock } from './styled';
import type { DMEData, DME } from 'Core/types';

export type BlockInfo = {
  type: string;
  content?: any;
  settings?: any;
};

interface BlockProps<Type=DMEData.DefaultDataType> {
  data: DMEData.Block<Type>;
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

  const blockType =  props.data.type;

  const widgetArr = blockType.split(':');
  const Widget = getWidgetComponent(widgetArr[0]);

  const getCssStyles = ()=>{  
    const styleData = props.data.style;
    let styleStr = '';
    let styleClasses:{[key:string]:Array<string>} = {};
    if( styleData ){
      for(const styleIdentifier of Object.keys(styleData) ){
        const widgetStyle = getWidgetStyle(blockType, styleIdentifier);
        const styleOption = widgetStyle.options.find(item=>item.identifier===styleData[styleIdentifier])
        if( styleOption ){
          if( styleOption.cssStyle ){
              styleStr += css( styleOption.cssStyle )+' ';
          }
          const classes = styleOption.cssClasses;
          if(classes){
             Object.keys( classes ).map(key=>{
               styleClasses[key] = [...(styleClasses[key]||[]), classes[key]]
             });
          }
        }
      }
    }

    let builtinClasses = ` dme-block dme-blocktype-${widgetArr[0]}`;
    if(widgetArr[1]){
      builtinClasses += ' dme-blockvariant-'+widgetArr[1];
    }

    let rootClasses = styleStr + builtinClasses;
    if( Object.keys(styleClasses).length>0){
      if( styleClasses['root'] ){
        rootClasses += ` ${styleClasses['root'].join(' ')}`;
      }
      return {rootClasses:rootClasses, styleClasses:styleClasses};
    }
    return { rootClasses:rootClasses} ;
  }  

  // const Widget = getWidgetComponent(props.data.type);

  return Widget ? (
    // <div className={`${getCssStyles()} dme-block dme-blocktype-${widgetArr[0]} ${widgetArr[1]?'dme-blockvariant-'+widgetArr[1]:''}`}>
    <Widget
      adding={props.newBlock}
      inBlock={props.inBlock ? true : false}
      {...getCssStyles()}
      blockNode={props.data}
      active={isActive}
      onCancel={props.onCancel}
      onDelete={props.onDelete}
    />
    // </div>
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
