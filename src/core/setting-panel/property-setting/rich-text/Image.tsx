import { ReactNode } from 'react';
import { css } from '@emotion/css';
import { DeleteOutlined } from '@mui/icons-material';
import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';

import { Resizable } from '../../../components/resizable';
import { Button } from './helper';
import { StyledResizable } from './styled';

interface Size {
  width: number;
  height: number;
  scale?: number;
}
interface ImageProps {
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: {
    url: string;
    setting: Required<Size>;
  } & Node;
}

const Image = (props: ImageProps) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();

  const handleChange = (size: Size) => {
    console.log('wing size', size, element);
    let setting: Size = element.setting ? { ...element.setting, ...size } : { ...size };
    Transforms.setNodes(editor, setting, { at: path });
  };

  const { height, width, scale } = element.setting;
  return (
    <div className={StyledResizable}>
      <Resizable
        width={width}
        height={height}
        scale={scale}
        style={
          {
            // display: 'inline-block',
            // margin: '5px',
            // verticalAlign: 'top',
            // border: '1px solid #ddd',
          }
        }
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
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default Image;
