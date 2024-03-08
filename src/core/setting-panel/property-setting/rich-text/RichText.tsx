import * as React from 'react';
import { css } from '@emotion/css';
import definition from 'dmeditor/components/widgets/text/definition';
import { useEditorStore } from 'dmeditor/index';
import { SlateFun } from 'dmeditor/utils/Slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { BlockButton, MarkButton, toggleMark, Toolbar } from './helper';

const { useCallback, useMemo } = React;
const { Element, Leaf, HOTKEYS } = SlateFun;

const RichText = (props: { property: string; value: any }) => {
  const { property, value } = props;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (newValue: Array<any>) => {
    updateSelectedBlockProps(property, newValue);
  };

  editor.children = value;

  return (
    <div
      className={css`
        border: 1px solid #dddddd;
      `}
    >
      <Slate
        editor={editor}
        onChange={handleChange}
        value={value || definition.events.createBlock().data.value}
      >
        <Toolbar>
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />
          {/* <MarkButton format="code" /> */}
          {/* <BlockButton format="heading-one" /> */}
          {/* <BlockButton format="heading-two" /> */}
          {/* <BlockButton format="block-quote" /> */}
          <BlockButton format="numbered-list" />
          <BlockButton format="bulleted-list" />
          <BlockButton format="align-left" />
          <BlockButton format="align-center" />
          <BlockButton format="align-right" />
          <BlockButton format="align-justify" />
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
