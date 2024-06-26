import * as React from 'react';
import { css } from '@emotion/css';
import { createEditor } from 'slate';
import type { Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { useEditorStore, type DME } from '../../../..';
import definition from '../../../../widgets/text/definition';
import AddLinkButton from './AddLinkButton';
import {
  BlockButton,
  Element,
  formatImage,
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

  // TODO:
  editor.children = formatImage(value);

  const initialValue = useMemo(() => formatImage(value), [value]);

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
          onKeyDown={(event: any) => {
            //soft break
            if (event.key === 'Enter' && event.shiftKey) {
              event.preventDefault();
              editor.insertText('\n');
            }
          }}
          style={{ padding: 10, minHeight: 100, height: 160, resize: 'vertical', overflow: 'auto' }}
          placeholder="Enter some rich text…"
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
