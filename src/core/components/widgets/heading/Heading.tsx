import * as React from 'react';
import { TitleOutlined } from '@mui/icons-material';

import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import useHeadingStore from 'Src/core/setting-panel/store/heading';
import { isHTMLElement } from 'Src/core/utils';
import { BlockListRender } from '../../../main/renderer';
import { Data } from '../../types/blocktype';
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
  blockdata: any;
}
// const Heading = ({ align, level }: { align: string; level: number }) => {
const Heading = (props: HeadingProps) => {
  // TODO: chore blockdata

  //const entityData:EntityHeadingBlock;

  const { blockdata } = props;
  console.log('wong', blockdata);
  // const [styleIdentifier, setStyleIdentifier] = useState(style);
  const { id, level, value } = blockdata;
  const defaultValue: any = useRef(value);

  // const changeText = (e?: any) => {
  //   const texts = e.target.innerText;
  //   setText(texts);
  // };

  const common = {
    style: {
      textAlign: blockdata.props.align,
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
        {props.blockdata.children&&<div style={{padding: 10, border: '1px solid #cccccc'}}>
          <BlockListRender data={props.blockdata.children} selected={0} />
      </div>}
    </div>
  );
};

export const toolHeading: ToolDefinition = {
  type: 'heading',
  isComposited: false,
  name: 'Heading',
  menu: { category: 'basic', icon: <TitleOutlined /> },
  initData: () => {
    return {
      type: 'heading',
      data: '',
      settings: { style: { width: 'auto' }, level: 2 },
    };
  },
  render: Heading,
};

Heading.displayName = 'heading';

export default Heading;
