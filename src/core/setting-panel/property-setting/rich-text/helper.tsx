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
import {
  BaseText,
  Editor,
  Node,
  Point,
  Range,
  Element as SlateElement,
  Transforms,
  type Descendant,
} from 'slate';
import {
  ReactEditor,
  RenderLeafProps,
  useFocused,
  useSelected,
  useSlate,
  useSlateStatic,
} from 'slate-react';

import { BrowseImageCallbackParams, dmeConfig } from '../../../config';
import { ImageChooser } from '../../../utility/ImageChooser';
import { imageExtensionIsValid, isNumber, isUrl } from '../../../utils';
import AddLinkButton from './AddLinkButton';
import ImageComponent from './Image';
import { IMAGE_INLINE_WIDTH, IMAGE_WIDTH, LIST_TYPES, TEXT_ALIGN_TYPES } from './options';
import RemoveLinkButton from './RemoveLinkButton';

const urlRegex = /(https?:\/\/[^\s]+)/g;
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
          color: ${reversed ? '#aaa' : '#666666'};
          background-color: ${active ? '#eeeeee' : 'none'};
          padding: 3px;
          border-radius: 4px;
          border: 1px solid ${active ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)'};
          &:hover {
            border-color: #cccccc;
          }
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
    case 'h1':
      return <LooksOneOutlined />;
    case 'h2':
      return <LooksTwoOutlined />;
    default:
      return null;
  }
};

const ToolsGroup = (props) => {
  return (
    <div
      className={css`
        & > * {
          display: inline-block;
          margin-left: 2px;
        }
      `}
    >
      {props.children}
      <span
        className={css`
          width: 1px;
          background: #cccccc;
          height: 22px;
          margin-left: 2px;
          margin-right: 2px;
        `}
      ></span>
    </div>
  );
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

const isMarkActive = (editor: Editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor: Editor, format, blockType = 'type') => {
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

const toggleMark = (editor: Editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const toggleBlock = (editor, format) => {
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
            vertical-align: middle;
            margin-left: 2px;
            margin-top: 4px;
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
          border-bottom: 1px solid #eee;
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

  const zIndex = dmeConfig.editor.zIndex;

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: ${zIndex + 200};
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        // onMouseDown={(e: MouseEvent) => {
        //   // prevent toolbar from taking focus away from editor
        //   e.preventDefault();
        // }}
      >
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <AddLinkButton />
        {isLinkActive(editor) && <RemoveLinkButton />}
      </Menu>
    </Portal>
  );
};

const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);
export const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected();
  return (
    <a
      {...attributes}
      href={element.url}
      {...(element.target ? { target: element.target } : {})}
      className={
        selected
          ? css`
              box-shadow: 0 0 0 3px #ddd;
            `
          : ''
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
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
  // mode: DME.WidgetRenderProps['mode'];
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
    case 'h1':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
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
      return <ImageComponent {...props} />;
    case 'link':
      return <LinkComponent {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

interface MiniRichTextLeafProps extends RenderLeafProps {
  attributes: RenderLeafProps['attributes'];
  children: React.ReactNode;
  leaf: {
    bold: boolean;
    code: boolean;
    italic: boolean;
    underline?: boolean;
    'font-family': string;
    'font-size': string;
    color: string;
  } & Pick<BaseText, 'text'>;
}
const Leaf = ({ attributes, children, leaf }: MiniRichTextLeafProps) => {
  const fontStyles = {
    fontFamily: dmeConfig.editor.fontFamily.map((i) => i.value).includes(leaf['font-family'])
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

  const handleConfirm = (images: BrowseImageCallbackParams, options) => {
    if (images.length > 0) {
      const id = images[0].id;
      // choosed from gallery
      if (isNumber(id)) {
        const url = images[0].src;
        insertImage(editor, url, { inline: options.inline });
        return;
      } else {
        const url = images[0].src;
        if (url && !isImageUrl(url)) {
          alert('URL is not an image');
          return;
        }
        url && insertImage(editor, url, { inline: options.inline });
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
          options={{ showInline: true }}
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
  if (url.startsWith('data:')) {
    return true;
  }
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  // return imageExtensions.includes(ext);
  return imageExtensionIsValid(ext);
};

type ImageElement = {
  setting: {
    width: number;
    height: number;
    inline?: boolean;
  };
  type: 'image';
  url: string;
  children: EmptyText[];
};

const insertImage = (editor: ReactEditor, url: string, options?: { inline?: boolean }) => {
  const text = { text: '' };

  const thumbnailUrl = dmeConfig.general.imagePath(url, 'thumbnail');

  const imageObj = new Image();
  imageObj.src = thumbnailUrl;
  imageObj.onload = () => {
    const ratio = imageObj.naturalWidth / imageObj.naturalHeight;

    const defaultWidth = options?.inline ? IMAGE_INLINE_WIDTH : IMAGE_WIDTH;
    const defaultHeight = defaultWidth / ratio;
    const image: ImageElement = {
      type: 'image',
      url: dmeConfig.general.imagePath(url),
      children: [text],
      setting: {
        width: defaultWidth,
        height: defaultHeight,
        inline: options?.inline,
      },
    };
    Transforms.insertNodes(editor, image);
    if (!options?.inline) {
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      });
    }
  };

  imageObj.onerror = () => {
    window.alert('Image not found');
  };
};

type LinkElement = { type: 'link'; url: string; target?: string; children: Descendant[] };
type LinkNode = Node & LinkElement;
const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (node: Node) =>
      !Editor.isEditor(node) && SlateElement?.isElement(node) && (node as LinkNode).type === 'link',
  });
  return !!link;
};

export const getLink = (editor: Editor): { link: string; target?: string } => {
  const [link] = Editor.nodes(editor, {
    match: (node: Node) =>
      !Editor.isEditor(node) && SlateElement?.isElement(node) && (node as LinkNode).type === 'link',
  });
  if (link) {
    if ('url' in link[0]) {
      return { link: link[0].url as string, target: (link[0] as any).target };
    }
  }
  return { link: '' };
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) && SlateElement.isElement(node) && (node as LinkNode).type === 'link',
  });
};
const wrapLink = (editor: Editor, url: string, openNew: boolean) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };
  if (openNew) {
    link.target = '_blank';
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const insertBlankLink = (editor: Editor, url: string) => {
  const linkNode = {
    type: 'link',
    url,
    children: [{ text: url }],
    target: '_blank',
  };

  Transforms.insertNodes(editor, linkNode);
  Transforms.insertText(editor, ' ');
  Transforms.move(editor, { distance: 1, unit: 'offset' });
};

interface withInsertDataEdtior extends ReactEditor {
  insertData: (data: any) => void;
}
const withInlines = (editor: withInsertDataEdtior) => {
  const { insertData, insertText, isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element) => {
    if (element.type === 'image') {
      return element.setting?.inline ? true : false;
    }
    return ['link', 'button', 'badge'].includes(element.type) || isInline(element);
  };

  editor.isElementReadOnly = (element) => element.type === 'badge' || isElementReadOnly(element);

  editor.isSelectable = (element) => element.type !== 'badge' && isSelectable(element);

  editor.insertText = (text) => {
    const parts = text.split(urlRegex);

    parts.forEach((part) => {
      if (urlRegex.test(part)) {
        insertBlankLink(editor, part);
      } else {
        insertText(part);
      }
    });
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) {
      wrapLink(editor, text, true);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const withImages = (editor: withInsertDataEdtior) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
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
  ToolsGroup,
  isLinkActive,
  wrapLink,
  unwrapLink,
  withInlines,
};

export type { LinkElement, MiniRichTextLeafProps };
