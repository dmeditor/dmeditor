import React, { PropsWithChildren, ReactNode, Ref, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';
import {
  DeleteOutlined,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  ImageOutlined,
  LooksOneOutlined,
  LooksTwoOutlined,
} from '@mui/icons-material';
import { ImageChooser } from 'dmeditor/components/utility/ImageChooser';
import { BrowseImageCallbackParams, dmeConfig } from 'dmeditor/config';
import { imageExtensionIsValid, isNumber, isUrl } from 'dmeditor/utils';
import { Editor, Node, Point, Range, Element as SlateElement, Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlate, useSlateStatic } from 'slate-react';

import { LIST_TYPES, TEXT_ALIGN_TYPES } from './options';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
// type OrNull<T> = T | null;
const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};
        `,
      )}
    />
  ),
);

const getIcon = (format: string): ReactNode => {
  switch (format) {
    case 'left':
      return <FormatAlignLeft />;
    case 'center':
      return <FormatAlignCenter />;
    case 'right':
      return <FormatAlignRight />;
    case 'justify':
      return <FormatAlignJustify />;
    case 'bulleted-list':
      return <FormatListBulleted />;
    case 'numbered-list':
      return <FormatListNumbered />;
    case 'bold':
      return <FormatBold />;
    case 'italic':
      return <FormatItalic />;
    case 'underline':
      return <FormatUnderlined />;
    case 'heading-one':
      return <LooksOneOutlined />;
    case 'heading-two':
      return <LooksTwoOutlined />;
    default:
      return null;
  }
};

const MarkButton = ({ format }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {getIcon(format)}
    </Button>
  );
};

const BlockButton = ({ format }) => {
  const editor = useSlate();
  console.log('editor', format);
  return (
    <Button
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {getIcon(format)}
    </Button>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  // console.log('wing', marks);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    }),
  );

  return !!match;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);
const Toolbar = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 10px;
          border-bottom: 1px solid #eee;
          margin-bottom: 10px;
        `,
      )}
    />
  ),
);

export const resetNodes = (
  editor: Editor,
  options: {
    nodes?: Node | Node[];
    at?: Location;
  } = {},
): void => {
  const cachedSelection = editor.selection;
  const children = [...editor.children];
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    editor.apply({ type: 'remove_node', path: [0], node });
  }

  if (options.nodes) {
    const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes;
    for (let i = 0; i < nodes.length; i++) {
      editor.apply({ type: 'insert_node', path: [i], node: nodes[i] });
    }
  }

  if (cachedSelection && Point.isBefore(cachedSelection.anchor, Editor.end(editor, []))) {
    Transforms.select(editor, cachedSelection);
    return;
  }
  Transforms.select(editor, Editor.end(editor, []));
};

const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;
};

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) {
      return;
    }
    if (domSelection.rangeCount === 0) {
      return;
    }
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.scrollY - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 51;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        onMouseDown={(e: MouseEvent) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
      </Menu>
    </Portal>
  );
};

interface ImageProps {
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: {
    url: string;
  };
}
const Image = (props: ImageProps) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={css`
          position: relative;
        `}
      >
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
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
  );
};

// const Element = ({
//   attributes,
//   children,
//   element,
// }: {
//   attributes: Record<string, unknown>;
//   children: ReactNode;
//   element: SlateElement;
// }) => {
interface ElementProps {
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: SlateElement;
}
const Element = (props: ElementProps) => {
  const { children, attributes, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return <Image {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: Record<string, unknown>;
  children: ReactNode;
  leaf: {
    bold: boolean;
    code: boolean;
    italic: boolean;
    underline: boolean;
    'font-family': string;
    'font-size': string;
    color: string;
  };
}) => {
  console.log('wing leaf', leaf);
  const fontStyles = {
    fontFamily: dmeConfig.editor.richText.fontFamily
      .map((i) => i.value)
      .includes(leaf['font-family'])
      ? leaf['font-family']
      : undefined,
    fontSize: leaf['font-size'],
    color: leaf.color,
  };
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  // if (leaf['font-family']) {
  //   children = <span style={{ fontFamily: leaf['font-family'] }}>{children}</span>;
  // }

  // if (leaf['font-size']) {
  //   children = <span style={{ fontSize: leaf['font-size'] }}>{children}</span>;
  // }

  // if (leaf.color) {
  //   children = <span style={{ color: leaf.color }}>{children}</span>;
  // }
  return (
    <span style={fontStyles} {...attributes}>
      {children}
    </span>
  );
};

const InsertImageButton = (props: { value: { id: string; src: string } | undefined }) => {
  const editor = useSlateStatic();
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState('');
  const { value } = props;

  const handleConfirm = (images: BrowseImageCallbackParams) => {
    if (images.length > 0) {
      const id = images[0].id;
      // choosed from gallery
      if (isNumber(id)) {
        const url = images[0].src;
        insertImage(editor, url);
        return;
      } else {
        const url = images[0].src;
        if (url && !isImageUrl(url)) {
          alert('URL is not an image');
          return;
        }
        url && insertImage(editor, url);
      }
    } else {
      console.error('No image data');
    }
  };

  return (
    <>
      <Button
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          setVisible(true);
        }}
      >
        <ImageOutlined />
      </Button>
      {visible ? (
        <ImageChooser
          value={[{ src: src || '', id: value?.id }]}
          visible={visible}
          multiple={false}
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
        />
      ) : null}
    </>
  );
};

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  // return imageExtensions.includes(ext);
  return imageExtensionIsValid(ext);
};

type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

const insertImage = (editor, url: string) => {
  const text = { text: '' };
  const image: ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  });
};

export {
  toggleMark,
  MarkButton,
  BlockButton,
  HoveringToolbar,
  Toolbar,
  Element,
  Leaf,
  InsertImageButton,
  Button,
  insertImage,
  isImageUrl,
};
