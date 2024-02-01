import * as React from 'react';
import { TitleOutlined } from '@mui/icons-material';

import { BlockListRender } from '../../../main/renderer';
import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import { DMEData } from '../../types/blocktype';
import { EntityHeadingBlock } from './entity';
import useHeadingStore from 'Src/core/setting-panel/store/heading';
import { isHTMLElement } from 'Src/core/utils';

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
interface HeadingProps {
  blockNode: DMEData.Block & { data: EntityHeadingBlock };
}
// const Heading = ({ align, level }: { align: string; level: number }) => {
const Heading = (props: HeadingProps) => {
  const blockNode = props.blockNode;
  // const [styleIdentifier, setStyleIdentifier] = useState(style);
  const {
    id,
    data: {
      level,
      value,
    },
    data,
  } = blockNode;
  const defaultValue: any = useRef(value);

  // const changeText = (e?: any) => {
  //   const texts = e.target.innerText;
  //   setText(texts);
  // };

  const common = {
    style: {
      textAlign: data.settings.align,
      color:data.settings.color,
      backgroundColor: data.settings['background-color']
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

  return (
    <div className={getCommonBlockCss('heading', '')}>
      <HeadingComponent level={level} id={id} {...common}>
        {defaultValue.current}
      </HeadingComponent>
    </div>
  );
};

Heading.displayName = 'heading';

export default Heading;
