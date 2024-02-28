import * as React from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import definition from 'Components/widgets/text/definition';
import { SlateFun } from 'Core/utils/Slate';
import { BlockButton, Toolbar } from 'Core/utils/SlateComponents';

const { useCallback, useMemo } = React;
const { Element, Leaf, HoveringToolbar, toggleMark, HOTKEYS } = SlateFun;

const RichText = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={definition.events.createBlock().data.value}>
      <Toolbar>
        {/* <MarkButton format="bold" icon="format_bold" /> */}
        {/* <MarkButton format="italic" icon="format_italic" /> */}
        {/* <MarkButton format="underline" icon="format_underlined" /> */}
        {/* <MarkButton format="code" icon="code" /> */}
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
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
  );
};

export default RichText;
