import * as React from 'react';
import { TitleOutlined } from '@mui/icons-material';

import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import useHeadingStore from 'Src/core/setting-panel/store/heading';
import { isHTMLElement } from 'Src/core/utils';
import { BlockListRender } from '../../../main/renderer';
import { DMEData } from '../../types/blocktype';
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
interface HeadingProps {
  data: EntityHeadingBlock;
}
// const Heading = ({ align, level }: { align: string; level: number }) => {
const Heading = (props: HeadingProps) => {


  const { data } = props;
  console.log('wong', data);
  // const [styleIdentifier, setStyleIdentifier] = useState(style);
  const { id, level, value } = data;
  const defaultValue: any = useRef(value);

  // const changeText = (e?: any) => {
  //   const texts = e.target.innerText;
  //   setText(texts);
  // };

  const common = {
    style: {
      textAlign: data.settings?.align,
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
        {props.data.children&&<div style={{padding: 10, border: '1px solid #cccccc'}}>
          <BlockListRender data={props.data.children} selected={0} />
      </div>}
    </div>
  );
};

Heading.displayName = 'heading';

export default Heading;
