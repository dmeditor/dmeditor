import { ReactNode } from 'react';
import { css } from '@emotion/css';
import {
  AlignHorizontalLeftOutlined,
  AlignHorizontalRightOutlined,
  DeleteOutlined,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatIndentIncreaseOutlined,
  VerticalSplitOutlined,
} from '@mui/icons-material';
import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';

import { type DME } from '../../../../core/types';
import { imageStyleObj, imageStyleString } from '../../../../core/utils';
import { Resizable } from '../../../components/resizable';
import { Button, ToolsGroup } from './helper';
import { StyledResizable } from './styled';

interface ImageSettings {
  width: number;
  height: number;
  scale?: number;
  align?: 'left' | 'center' | 'right';
  float?: boolean;
}
interface ImageProps {
  mode: DME.WidgetRenderProps['mode'];
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: {
    url: string;
    justifyContent?: string;
    setting: Required<ImageSettings> & Partial<Node>;
  } & Node;
}

const ResizableImage = (props: ImageProps) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();

  const handleChangeSize = (s: ImageSettings) => {
    let setting = { setting: { ...element.setting, ...s } };
    Transforms.setNodes(editor, setting as ImageProps['element'], { at: path });
  };

  const handleAlign = (align: ImageSettings['align']) => {
    const setting = {
      setting: { ...element.setting, align: element.setting.align === align ? undefined : align },
    } as ImageProps['element'];
    Transforms.setNodes(editor, setting, { at: path });
  };

  const handleFloat = (align: 'left' | 'right') => {
    const setting = element.setting;
    const newFloat = setting.align === align && setting.float ? false : true;
    const newSetting = {
      setting: { ...setting, float: newFloat, align: newFloat ? align : undefined },
    };

    Transforms.setNodes(editor, newSetting as ImageProps['element'], { at: path });
  };

  const { height, width, align, scale, float } = element.setting;

  const buttonObj = {
    className: css``,
  };

  return (
    <div
      className={StyledResizable}
      style={
        float
          ? { float: element.setting.align === 'right' ? 'right' : 'left' }
          : { textAlign: element.setting.align ?? 'left' }
      }
    >
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
        onChange={handleChangeSize}
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
                top: -46px;
                left: 0px;
                display: ${selected && focused ? 'flex' : 'none'};
                gap: 0.2em;
                padding: 0.2em;
                background: white;
                border: 1px solid #eeeeee;
              `}
            >
              <Button
                title="Delete"
                onClick={() => Transforms.removeNodes(editor, { at: path })}
                {...buttonObj}
              >
                <DeleteOutlined />
              </Button>
              <Button
                title="Float left"
                active={float && align === 'left'}
                onClick={() => handleFloat('left')}
                {...buttonObj}
              >
                <AlignHorizontalLeftOutlined />
              </Button>
              <Button
                title="Float right"
                active={float && align === 'right'}
                onClick={() => handleFloat('right')}
                {...buttonObj}
              >
                <AlignHorizontalRightOutlined />
              </Button>

              {!float && (
                <>
                  <Button
                    active={align === 'left'}
                    title="Left"
                    onClick={() => handleAlign('left')}
                    {...buttonObj}
                  >
                    <FormatAlignLeft />
                  </Button>

                  <Button
                    title="Center"
                    active={align === 'center'}
                    onClick={() => handleAlign('center')}
                    {...buttonObj}
                  >
                    <FormatAlignCenter />
                  </Button>
                  <Button
                    title="Right"
                    active={align === 'right'}
                    onClick={() => handleAlign('right')}
                    {...buttonObj}
                  >
                    <FormatAlignRight />
                  </Button>
                </>
              )}
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
    <div {...attributes} style={imageStyleObj(element, ['align'])}>
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
