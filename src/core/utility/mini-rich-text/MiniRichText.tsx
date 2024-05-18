import * as React from 'react';
import { FocusEventHandler } from 'react';
import { createEditor, type Descendant, type Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import {
  Element,
  formatImage,
  HoveringToolbar,
  Leaf,
  withImages,
  withInlines,
  type MiniTextLeafProps,
} from '../../setting-panel/property-setting/rich-text/helper';
import { type DME } from '../../types';

const { useCallback, useMemo } = React;

export interface MiniRichTextProps {
  // viewmode?: boolean;
  mode?: DME.WidgetRenderProps['mode'];
  value?: Array<Descendant> | null;
  onFocus?: FocusEventHandler | undefined;
  onValueChange: (value: Descendant[]) => void;
}

const emptyValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
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

  const renderLeaf = useCallback((props: MiniTextLeafProps) => <Leaf {...props} />, []) as any;
  const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);

  const handleValueChange = (newValue: Descendant[]) => {
    if (!Array.isArray(newValue)) {
      console.warn('MiniText: onChange: newValue is not an array', newValue);
      return;
    }
    onValueChange?.(newValue);
  };
  // TODO:
  editor.children = formatImage(value);

  return (
    <div>
      <Slate editor={editor} initialValue={value} onValueChange={handleValueChange}>
        <div>
          <HoveringToolbar />
          <Editable
            readOnly={mode === 'view'}
            renderLeaf={renderLeaf}
            onFocus={props.onFocus}
            renderElement={renderElement}
            placeholder={mode === 'view' ? '' : 'Input your content here'} //fixed: readonly empty still show placeholder
          />
        </div>
      </Slate>
    </div>
  );
};

export default MiniRichText;
