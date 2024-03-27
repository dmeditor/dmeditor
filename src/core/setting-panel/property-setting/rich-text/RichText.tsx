import * as React from 'react';
import { css } from '@emotion/css';
import { ImageOutlined } from '@mui/icons-material';
import definition from 'dmeditor/components/widgets/text/definition';
import { BrowseImageCallbackParams } from 'dmeditor/config';
import { useEditorStore } from 'dmeditor/index';
import { SlateFun } from 'dmeditor/utils/Slate';
import { createEditor, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, useSlateStatic, withReact } from 'slate-react';

import {
  BlockButton,
  Button,
  Element,
  InsertImageButton,
  Leaf,
  MarkButton,
  toggleMark,
  Toolbar,
} from './helper';
import MarkColor from './MarkColor';
import MarkSelector from './MarkSelector';

const { useCallback, useMemo, useState } = React;
const { HOTKEYS } = SlateFun;

const RichText = (props: { property: string; value: any; onChange?: () => void }) => {
  const { property, value = [] } = props;

  const renderElement = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      element: SlateElement;
    }) => <Element {...props} />,
    [],
  );

  const renderLeaf = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      leaf: { bold: boolean; code: boolean; italic: boolean; underline: boolean };
    }) => <Leaf {...props} />,
    [],
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (newValue: Array<any>) => {
    if (props.onChange) {
      props.onChange();
    } else {
      updateSelectedBlockProps(property, newValue);
    }
  };

  editor.children = value;

  const initialValue = useMemo(() => value || definition.events.createBlock().data.value, [value]);

  return (
    <div
      className={css`
        border: 1px solid #dddddd;
      `}
    >
      <Slate
        editor={editor}
        onChange={handleChange}
        initialValue={initialValue}
        onValueChange={(value) => {
          console.log(value);
        }}
      >
        <Toolbar>
          <MarkSelector format="font-family" />
          <MarkSelector format="font-size" />
          <MarkColor format="color" />
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />
          {/* <MarkButton format="code" /> */}
          <BlockButton format="heading-one" />
          <BlockButton format="heading-two" />
          {/* <BlockButton format="block-quote" /> */}
          <BlockButton format="numbered-list" />
          <BlockButton format="bulleted-list" />
          <BlockButton format="left" />
          <BlockButton format="center" />
          <BlockButton format="right" />
          <BlockButton format="justify" />
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
