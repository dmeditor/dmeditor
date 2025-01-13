import * as React from 'react';
import { FocusEventHandler, useEffect } from 'react';
import { createEditor, type Descendant, type Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import {
  Element,
  HoveringToolbar,
  Leaf,
  withImages,
  withInlines,
  type MiniRichTextLeafProps,
} from '../../setting-panel/property-setting/rich-text/helper';
import { type DME } from '../../types';

const { useCallback, useMemo } = React;

export interface MiniRichTextProps {
  // viewmode?: boolean;
  placeHolder?: string;
  mode?: DME.WidgetRenderProps['mode'];
  value?: Array<Descendant> | null;
  useEffectToUpdate?: boolean;
  onFocus?: FocusEventHandler; //Note: when onFocus is invoked if it rerender it can lose focus. Be careful using it.
  onValueChange?: (value: Descendant[]) => void;
}

const emptyValue = [
  {
    type: 'paragraph',
    children: [{ text: ' ' }],
  },
];

const MiniRichText = (props: MiniRichTextProps) => {
  const { onValueChange, mode } = props;
  const value = props.value || emptyValue;

  const renderElement = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      element: SlateElement;
    }) => <Element mode={mode} {...props} />,
    [],
  );

  const renderLeaf = useCallback((props: MiniRichTextLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);

  const handleValueChange = (newValue: Descendant[]) => {
    if (!Array.isArray(newValue)) {
      console.warn('MiniRichText: onChange: newValue is not an array', newValue);
      return;
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  useEffect(() => {
    if (props.useEffectToUpdate) {
      editor.children = value;
      //fix new empty in table not updated issue.
      if (!props.value) {
        editor.select(editor.end([]));
      }
    }
  }, [value]);

  if (!props.useEffectToUpdate) {
    editor.children = value;
  }

  return (
    <div>
      <Slate editor={editor} initialValue={value} onValueChange={handleValueChange}>
        <div>
          {mode === 'edit' && <HoveringToolbar />}
          <Editable
            readOnly={mode === 'view'}
            renderLeaf={renderLeaf}
            onFocus={props?.onFocus}
            renderElement={renderElement}
            onKeyDown={(event: any) => {
              //soft break
              if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
                editor.insertText('\n');
              }
            }}
            renderPlaceholder={({ children, attributes }) => (
              <span {...attributes}>
                <span style={{ textWrap: 'nowrap', fontSize: '0.9rem' }}>{children}</span>
              </span>
            )}
            placeholder={mode === 'view' ? '' : props.placeHolder || 'Input your content here'} //fixed: readonly empty still show placeholder
          />
        </div>
      </Slate>
    </div>
  );
};

export { MiniRichText };
