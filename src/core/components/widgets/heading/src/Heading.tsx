import * as React from 'react';
import { TitleOutlined } from '@mui/icons-material';
import { useEditorStore } from 'dmeditor/main/store';
import useHeadingStore from 'dmeditor/setting-panel/store/heading';
import type { DME, DMEData } from 'dmeditor/types';
import { isHTMLElement } from 'dmeditor/utils';

import { BlockListRender } from '../../../../main/renderer';
import { getCommonBlockCss, getStyleCss } from '../../../../main/renderer/BlockRender';
import { EntityHeadingBlock } from './entity';

const { useState, useRef, useEffect } = React;
interface HeadingComponentProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  level?: number;
}

const HeadingComponent: React.FC<HeadingComponentProps> = ({ level: number = 2, ...restProps }) => {
  return React.createElement(
    `h${number}`,
    {
      ...restProps,
      style: restProps.style,
      suppressContentEditableWarning: true,
    },
    restProps.children,
  );
};

// const Heading = ({ align, level }: { align: string; level: number }) => {
const Heading = (props: DME.WidgetRenderProps<EntityHeadingBlock>) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const { updateSelectedBlock } = useEditorStore();
  // const [styleIdentifier, setStyleIdentifier] = useState(style);
  const {
    id,
    data: { level, value },
    data,
  } = blockNode;

  const common = {
    style: {
      textAlign: data.settings?.align,
      color: data.settings?.color,
    },
    // ref: (input: any) => input && input.focus(),
    onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => {
      if (isHTMLElement(e?.target)) {
        // headingStateChange('value', e.target.innerText);
        // emitter.emit('change', e.target.innerText);
      }
    },
    ...(id ? { id: id } : {}),
    // contentEditable: props.active,
  };

  const handleChange = (value: string) => {
    updateSelectedBlock<EntityHeadingBlock>((entity) => {
      entity.value = value;
    });
  };

  return (
    <>
      <div className={rootClasses} style={{ backgroundColor: data.settings?.['background-color'] }}>
        <HeadingComponent
          level={level}
          className={styleClasses['h'] || '' + ' dme-w-heading-h'}
          id={id}
          {...common}
          contentEditable={props.mode === 'edit'}
          onBlur={(e) => handleChange((e.currentTarget as HTMLElement).innerText)}
        >
          {value}
        </HeadingComponent>
      </div>
    </>
  );
};

export default Heading;
