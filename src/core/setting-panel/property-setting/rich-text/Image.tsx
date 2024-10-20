import { ReactNode, useMemo } from 'react';
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
import { Resizable } from '../../../components/resizable';
import { Button } from './helper';
import { StyledResizable } from './styled';

interface ImageSettings {
  width: number;
  height: number;
  inline?: boolean;
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

const EditImage = (props: ImageProps) => {
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

  const { height, width, align, scale, float, inline } = element.setting;

  const buttonObj = {
    className: css``,
  };

  if (!(selected && focused)) {
    return <ViewImage {...props} />;
  }

  return (
    <div
      className={StyledResizable}
      style={{
        ...(float
          ? { float: element.setting.align === 'right' ? 'right' : 'left' }
          : { textAlign: element.setting.align ?? 'left' }),
        ...(inline ? { display: 'inline-block', verticalAlign: 'middle' } : {}),
      }}
    >
      <Resizable
        width={width}
        height={height}
        scale={scale}
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          boxShadow: '0 0 0 2px #B4D5FF',
        }}
        onChange={handleChangeSize}
        isActive={true}
      >
        <div
          {...attributes}
          contentEditable={false}
          className={css`
            position: relative;
            width: 100%;
            height: 100%;
          `}
        >
          {children}
          <ImageRender url={element.url} width={'100%'} height={'100%'} />
          <div
            className={css`
              position: absolute;
              top: -46px;
              left: 0px;
              display: flex;
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
            {!inline && (
              <>
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
              </>
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

const ImageRender = (props: { width: number | string; height: number | string; url: string }) => {
  return (
    <img
      src={props.url}
      style={{ width: props.width, height: props.height, objectFit: 'contain' }}
    />
  );
};

const ViewImage = (props: ImageProps) => {
  const {
    attributes,
    children,
    element,
    element: { setting },
  } = props;

  const containerStyle = useMemo(() => {
    const result: React.CSSProperties = {};
    const { align, float, inline } = setting;
    if (float) {
      result.float = align === 'left' ? 'left' : 'right';
    } else {
      result.textAlign = align ? align : 'left';
    }
    if (inline) {
      result.display = 'inline-block';
      result.verticalAlign = 'middle';
    }
    return result;
  }, [setting.align, setting.float]);

  return (
    <div {...attributes} style={containerStyle}>
      {children}
      <ImageRender
        width={element.setting.width}
        height={element.setting.height}
        url={element.url}
      />
    </div>
  );
};

const Image = (props: ImageProps) => {
  const { mode } = props;
  return mode === 'view' ? <ViewImage {...props} /> : <EditImage {...props} />;
};

export default Image;
