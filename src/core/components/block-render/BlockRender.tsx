import * as React from 'react';
import { useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { useDevice } from 'dmeditor/core/hooks/useDeivce';
import _debounce from 'lodash/debounce';

import { Mode } from '../../constants';
import { useEditorStore } from '../../main/store';
import type { DME, DMEData } from '../../types';
import { getWidget, getWidgetComponent, getWidgetStyle } from '../../utils/register';
import { BlockMask, BlockWrapper } from './styled';

interface BlockRenderProps extends Pick<DME.WidgetRenderProps, 'mode' | 'path'> {
  data: DMEData.Block;
  inBlock?: boolean;
}

export const BlockRender: React.FC<BlockRenderProps> = React.memo((props) => {
  const {
    path,
    data: { id, style: styleObj },
    mode,
  } = props;

  const {
    updateSelectedBlockIndex,
    selected: { blockIndex: selectedBlockIndex, currentListPath },
  } = useEditorStore();

  const active = path.join(',') === [...currentListPath, selectedBlockIndex].join(',');

  const childrenOrSelfActive = [...currentListPath, selectedBlockIndex]
    .join(',')
    .startsWith(path.join(','));

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
    let styles = [];
    let styleClasses: { [key: string]: string } = {};

    let builtinClasses = ` dme-block dme-block-depth-${path.length} dme-blocktype-${widgetArr[0]}`;
    if (widgetArr[1]) {
      builtinClasses += ' dme-blockvariant-' + widgetArr[1];
    }
    let rootClasses = builtinClasses;

    if (styleObj) {
      for (const styleIdentifier of Object.keys(styleObj)) {
        const widgetStyle = getWidgetStyle(blockType, styleIdentifier);
        if (!widgetStyle) {
          console.warn(`Style ${styleIdentifier} not found on ${blockType}. Ignored.`);
          continue;
        }
        const styleOption = widgetStyle.options.find(
          (item) => item.identifier === styleObj[styleIdentifier],
        );
        if (styleOption) {
          if (styleOption.cssStyle) {
            styles.push(styleOption.cssStyle);
          }
          const classes = styleOption.cssClasses;
          if (classes) {
            Object.keys(classes).map((key) => {
              styleClasses[key] = (styleClasses[key] ? styleClasses[key] + ' ' : '') + classes[key];
            });
          }
        }
      }

      if (Object.keys(styleClasses).length > 0) {
        if (styleClasses['root']) {
          rootClasses += ` ${styleClasses['root']}`;
        }
      }
      return { rootClasses: rootClasses, widgetStyles: styles, styleClasses: styleClasses };
    }
    return { rootClasses: rootClasses, styleClasses: {} };
  }, [id, path, styleObj]);

  if (!Widget) {
    console.warn(`Widget ${widgetArr} not found. Render empty.`);
    return <></>;
  }

  const generalSettings = { ...props.data.data.settings?.general };
  const device = useDevice();

  const divRef = useRef<HTMLDivElement>(null);

  const def = useMemo(() => {
    return getWidget(widgetArr[0]);
  }, [widgetArr[0]]);

  return (
    <BlockWrapper
      className={'dme-block-wrapper ' + cssStyles.rootClasses}
      widgetStyles={cssStyles.widgetStyles}
      onClick={onSelect}
      ref={divRef}
      active={active}
      device={device}
      editMode={mode === 'edit'}
      generalSettings={generalSettings}
      {...(mode === Mode.edit && props.data.id && { id: props.data.id })}
    >
      <Widget
        inBlock={!!props.inBlock}
        styleClasses={cssStyles.styleClasses}
        blockNode={props.data}
        path={props.path}
        mode={mode}
        active={!!active}
      />
      {def.editMask && mode === 'edit' && !childrenOrSelfActive && (
        <BlockMask height={divRef?.current?.clientHeight || 0} />
      )}
    </BlockWrapper>
  );
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
