import * as React from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import _debounce from 'lodash/debounce';

import { Mode } from '../../constants';
import { useEditorStore } from '../../main/store';
import type { DME, DMEData } from '../../types';
import { getWidgetComponent, getWidgetStyle } from '../../utils/register';
import { BlockWrapper } from './styled';

interface BlockRenderProps extends Pick<DME.WidgetRenderProps, 'mode' | 'path'> {
  data: DMEData.Block<DMEData.DefaultBlockType>;
  inBlock?: boolean;
}

export const BlockRender: React.FC<BlockRenderProps> = React.memo((props) => {
  const {
    path,
    data: { id, style: styleData },
    mode,
  } = props;

  const {
    updateSelectedBlockIndex,
    selected: { blockIndex: selectedBlockIndex, currentListPath },
  } = useEditorStore();

  const active = path.join(',') === [...currentListPath, selectedBlockIndex].join(',');

  const blockType = props.data.type;

  const widgetArr = blockType.split(':');
  const Widget = getWidgetComponent(widgetArr[0]).render;

  const onSelect = (e: React.MouseEvent) => {
    if (props.mode === Mode.edit) {
      e.stopPropagation();
      updateSelectedBlockIndex(props.path, props.data.id || '');
    }
  };

  const cssStyles = React.useMemo(() => {
    let styleStr = '';
    let styleClasses: { [key: string]: string } = {};

    if (styleData) {
      for (const styleIdentifier of Object.keys(styleData)) {
        const widgetStyle = getWidgetStyle(blockType, styleIdentifier);
        if (!widgetStyle) {
          console.warn(`Style ${styleIdentifier} not found on ${blockType}. Ignored.`);
          continue;
        }
        const styleOption = widgetStyle.options.find(
          (item) => item.identifier === styleData[styleIdentifier],
        );
        if (styleOption) {
          if (styleOption.cssStyle) {
            styleStr += css(styleOption.cssStyle) + ' ';
          }
          const classes = styleOption.cssClasses;
          if (classes) {
            Object.keys(classes).map((key) => {
              styleClasses[key] = (styleClasses[key] ? styleClasses[key] + ' ' : '') + classes[key];
            });
          }
        }
      }

      let builtinClasses = ` dme-block dme-blocktype-${widgetArr[0]}`;
      if (widgetArr[1]) {
        builtinClasses += ' dme-blockvariant-' + widgetArr[1];
      }

      let rootClasses = styleStr + builtinClasses;
      if (Object.keys(styleClasses).length > 0) {
        if (styleClasses['root']) {
          rootClasses += ` ${styleClasses['root']}`;
        }
      }
      return { rootClasses: rootClasses, styleClasses: styleClasses };
    }
    return { rootClasses: '', styleClasses: {} };
  }, [id, styleData]);

  return Widget ? (
    <BlockWrapper
      className={'dme-block-wrapper ' + cssStyles.rootClasses}
      onClick={onSelect}
      active={active}
      editMode={mode === 'edit'}
      generalSettings={props.data.data.settings?.general}
      {...(mode === Mode.edit && props.data.id && { id: props.data.id })}
    >
      <Widget
        inBlock={!!props.inBlock}
        {...cssStyles}
        blockNode={props.data}
        path={props.path}
        mode={mode}
        active={!!active}
      />
    </BlockWrapper>
  ) : null;
});

export const RenderMenu = (props: {
  onAdd: (type: string, template?: string) => void;
  onCancel: () => void;
  allowedType?: string[];
}) => {
  const menuRoot = document.getElementById('dmeditor-add-menu');

  return menuRoot ? ReactDOM.createPortal(<div></div>, menuRoot as HTMLElement) : <></>;
};

export const getStyleCss = (blocktype: string, styleIdentifier?: string) => {
  // let def = getDef(blocktype);
  let def = {};
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
