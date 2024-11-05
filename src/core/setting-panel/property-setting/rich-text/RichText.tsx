import * as React from 'react';
import { css } from '@emotion/css';
import { createEditor } from 'slate';
import type { Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { useEditorStore, type DME } from '../../../..';
import AddLinkButton from './AddLinkButton';
import BlockSelector from './BlockSelector';
import { CharacterButton } from './CharacterButton';
import {
  BlockButton,
  Element,
  InsertImageButton,
  Leaf,
  MarkButton,
  Toolbar,
  ToolsGroup,
  withImages,
  withInlines,
} from './helper';
import MarkColor from './MarkColor';
import MarkSelector from './MarkSelector';
import RemoveLinkButton from './RemoveLinkButton';

const { useCallback, useMemo } = React;

const RichText = (props: DME.SettingComponentProps & { property: string; value: any }) => {
  const { property, value = [], blockPath } = props;
  const { initHeight } = props.parameters || {};

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
      return <Leaf {...props} />;
    },
    [],
  );

  const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);

  const { updateBlockPropsByPath } = useEditorStore();
  const handleValueChange = (newValue: Descendant[]) => {
    updateBlockPropsByPath(blockPath, property, newValue);
  };

  editor.children = value;

  const initialValue = value;

  return (
    <div
      className={css`
        border: 1px solid #dddddd;
      `}
    >
      <Slate editor={editor} initialValue={initialValue} onValueChange={handleValueChange}>
        <Toolbar>
          <BlockSelector format="heading" />
          <MarkSelector format="font-family" />
          <MarkSelector format="font-size" />
          <MarkColor format="color" />
          <ToolsGroup>
            <MarkButton format="bold" />
            <MarkButton format="italic" />
            <MarkButton format="underline" />
          </ToolsGroup>
          {/* <MarkButton format="code" /> */}
          {/* <ToolsGroup>
            <BlockButton format="h1" />
            <BlockButton format="h2" />
          </ToolsGroup> */}
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
          <CharacterButton />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: any) => {
            //soft break
            if (event.key === 'Enter' && event.shiftKey) {
              event.preventDefault();
              editor.insertText('\n');
            }
          }}
          style={{
            background: 'white',
            padding: 10,
            minHeight: 100,
            height: initHeight,
            resize: 'vertical',
            overflow: 'auto',
          }}
          placeholder="Enter some text…"
          // spellCheck
          // autoFocus
          // onKeyDown={(event) => {
          //   for (const hotkey in HOTKEYS) {
          //     // if (isHotkey(hotkey, event as any)) {
          //     event.preventDefault();
          //     const mark = HOTKEYS[hotkey];
          //     toggleMark(editor, mark);
          //     // }
          //   }
          // }}
        />
      </Slate>
    </div>
  );
};

export default RichText;
