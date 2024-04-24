import * as React from 'react';
import { css } from '@emotion/css';
import definition from 'dmeditor/components/widgets/text/definition';
import { useEditorStore } from 'dmeditor/index';
import {
  BlockButton,
  Element,
  InsertImageButton,
  Leaf,
  MarkButton,
  toggleMark,
  Toolbar,
  ToolsGroup,
  withInlines,
} from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import MarkColor from 'dmeditor/setting-panel/property-setting/rich-text/MarkColor';
import MarkSelector from 'dmeditor/setting-panel/property-setting/rich-text/MarkSelector';
import { isUrl } from 'dmeditor/utils';
import { SlateFun } from 'dmeditor/utils/Slate';
import { createEditor } from 'slate';
import type { Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import AddLinkButton from './AddLinkButton';
import RemoveLinkButton from './RemoveLinkButton';

const { useCallback, useMemo } = React;
const { HOTKEYS } = SlateFun;

const RichText = (props: { property: string; value: any }) => {
  const { property, value = [] } = props;

  const renderElement = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      element: SlateElement;
    }) => <Element {...props} />,
    [],
  );

  const Text = (props) => {
    const { attributes, children, leaf } = props;
    return (
      <span
        // The following is a workaround for a Chromium bug where,
        // if you have an inline at the end of a block,
        // clicking the end of a block puts the cursor inside the inline
        // instead of inside the final {text: ''} node
        // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
        className={
          leaf.text === ''
            ? css`
                padding-left: 0.1px;
              `
            : null
        }
        {...attributes}
      >
        {children}
      </span>
    );
  };
  const renderLeaf = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
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
      console.log(isUrl(props.leaf?.text));
      // return isUrl(props.leaf?.text) ? <Text {...props} /> : <Leaf {...props} />;
      return <Text {...props} />;
    },
    [],
  );

  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), []);

  const { updateSelectedBlockProps } = useEditorStore();
  const handleValueChange = (newValue: Descendant[]) => {
    updateSelectedBlockProps(property, newValue);
  };

  editor.children = value;

  const initialValue = useMemo(() => value || definition.events.createBlock().data.value, [value]);

  return (
    <div
      className={css`
        border: 1px solid #dddddd;
      `}
    >
      <Slate editor={editor} initialValue={initialValue} onValueChange={handleValueChange}>
        <Toolbar>
          <MarkSelector format="font-family" />
          <MarkSelector format="font-size" />
          <MarkColor format="color" />
          <ToolsGroup>
            <MarkButton format="bold" />
            <MarkButton format="italic" />
            <MarkButton format="underline" />
          </ToolsGroup>
          {/* <MarkButton format="code" /> */}
          <ToolsGroup>
            <BlockButton format="heading-one" />
            <BlockButton format="heading-two" />
          </ToolsGroup>
          {/* <BlockButton format="block-quote" /> */}
          <ToolsGroup>
            <BlockButton format="numbered-list" />
            <BlockButton format="bulleted-list" />
          </ToolsGroup>
          <ToolsGroup>
            <BlockButton format="left" />
            <BlockButton format="center" />
            <BlockButton format="right" />
            <BlockButton format="justify" />
          </ToolsGroup>
          <ToolsGroup>
            <AddLinkButton />
            <RemoveLinkButton />
          </ToolsGroup>
          <InsertImageButton value={value} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{ padding: 10, minHeight: 100, height: 160, resize: 'vertical', overflow: 'auto' }}
          placeholder="Enter some rich text…"
          // spellCheck
          // autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              // if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
              // }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default RichText;
