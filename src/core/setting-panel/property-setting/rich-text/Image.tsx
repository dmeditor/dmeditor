import { ReactNode } from 'react';
import { css } from '@emotion/css';
import {
  DeleteOutlined,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@mui/icons-material';
import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';

import { type DME } from '../../../../core/types';
import { imageStyleObj, imageStyleString } from '../../../../core/utils';
import { Resizable } from '../../../components/resizable';
import { Button } from './helper';
import { StyledResizable } from './styled';

interface Size {
  width: number;
  height: number;
  scale?: number;
  align?: 'left' | 'center' | 'right';
}
interface ImageProps {
  mode: DME.WidgetRenderProps['mode'];
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: {
    url: string;
    justifyContent?: string;
    setting: Required<Size> & Partial<Node>;
  } & Node;
}

const ResizableImage = (props: ImageProps) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();

  const handleChange = (size: Size) => {
    let setting: Size = element.setting ? { ...element.setting, ...size } : { ...size };
    Transforms.setNodes(editor, setting as ImageProps['element']['setting'], { at: path });
  };

  const handleImage = (align: Size['align']) => {
    const setting = { setting: { align } } as ImageProps['element'];
    Transforms.setNodes(editor, setting, { at: path });
  };

  const { height, width, scale } = element.setting;
  return (
    <div className={StyledResizable} style={{ textAlign: element.setting.align ?? 'left' }}>
      <Resizable
        width={width}
        height={height}
        scale={scale}
        style={{
          display: 'inline-block',
          margin: '5px',
          verticalAlign: 'top',
          border: '1px solid #ddd',
        }}
        onChange={handleChange}
        isActive={selected && focused}
      >
        <div
          {...attributes}
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          {children}
          <div
            contentEditable={false}
            className={css`
              position: relative;
              width: 100%;
              height: 100%;
            `}
          >
            <img
              src={element.url}
              className={css`
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
                box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
              `}
            />
            <Button
              active
              onClick={() => Transforms.removeNodes(editor, { at: path })}
              className={css`
                display: ${selected && focused ? 'inline' : 'none'};
                position: absolute;
                top: 0.5em;
                left: 0.5em;
                background-color: white;
              `}
            >
              <DeleteOutlined />
            </Button>
            <Button
              active
              // onClick={() => Transforms.removeNodes(editor, { at: path })}
              onClick={() => handleImage('left')}
              className={css`
                display: ${selected && focused ? 'inline' : 'none'};
                position: absolute;
                top: 0.5em;
                left: 3em;
                background-color: white;
              `}
            >
              <FormatAlignLeft />
            </Button>
            <Button
              active
              onClick={() => handleImage('center')}
              className={css`
                display: ${selected && focused ? 'inline' : 'none'};
                position: absolute;
                top: 0.5em;
                left: 5.5em;
                background-color: white;
              `}
            >
              <FormatAlignCenter />
            </Button>
            <Button
              active
              onClick={() => handleImage('right')}
              className={css`
                display: ${selected && focused ? 'inline' : 'none'};
                position: absolute;
                top: 0.5em;
                left: 8em;
                background-color: white;
              `}
            >
              <FormatAlignRight />
            </Button>
          </div>
        </div>
      </Resizable>
    </div>
  );
};

const ViewImage = (props: ImageProps) => {
  const { attributes, children, element } = props;

  return (
    <div {...attributes} style={imageStyleObj(element, ['text-align'])}>
      {children}
      <img
        src={element.url}
        style={imageStyleObj(element, ['width', 'height'])}
        className={css`
          ${imageStyleString(element, ['width', 'height'])}
        `}
      />
    </div>
  );
};

const Image = (props: ImageProps) => {
  const { mode } = props;
  return mode === 'view' ? <ViewImage {...props} /> : <ResizableImage {...props} />;
};

export default Image;
