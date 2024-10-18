import { ReactNode } from 'react';
import { css } from '@emotion/css';
import {
  DeleteOutlined,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalSplitOutlined,
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

  const handleInline = () => {
    const setting = { setting: {} };
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
            <div
              className={css`
                position: absolute;
                top: 0.5em;
                left: 0px;
                display: flex;
                gap: 0.2em;
                padding-left: 0.2em;
              `}
            >
              <Button
                title="Delete"
                active
                onClick={() => Transforms.removeNodes(editor, { at: path })}
                className={css`
                  display: ${selected && focused ? 'inline' : 'none'};
                  background-color: white;
                `}
              >
                <DeleteOutlined />
              </Button>
              <Button
                active
                title="Left"
                // onClick={() => Transforms.removeNodes(editor, { at: path })}
                onClick={() => handleImage('left')}
                className={css`
                  display: ${selected && focused ? 'inline' : 'none'};
                  background-color: white;
                `}
              >
                <FormatAlignLeft />
              </Button>
              <Button
                title="Center"
                active
                onClick={() => handleImage('center')}
                className={css`
                  display: ${selected && focused ? 'inline' : 'none'};
                  background-color: white;
                `}
              >
                <FormatAlignCenter />
              </Button>
              <Button
                title="Right"
                active
                onClick={() => handleImage('right')}
                className={css`
                  display: ${selected && focused ? 'inline' : 'none'};
                  background-color: white;
                `}
              >
                <FormatAlignRight />
              </Button>
              <Button
                title="Inline / block"
                active
                onClick={() => handleInline()}
                className={css`
                  display: ${selected && focused ? 'inline' : 'none'};
                  background-color: white;
                `}
              >
                {/* <VerticalSplitOutlined /> */}
              </Button>
            </div>
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
        style={{ ...imageStyleObj(element, ['width', 'height']), objectFit: 'contain' }}
      />
    </div>
  );
};

const Image = (props: ImageProps) => {
  const { mode } = props;
  return mode === 'view' ? <ViewImage {...props} /> : <ResizableImage {...props} />;
};

export default Image;
