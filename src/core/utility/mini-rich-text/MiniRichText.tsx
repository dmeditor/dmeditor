import * as React from 'react';
import { createEditor } from 'slate';
import type { Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import {
  Element,
  HoveringToolbar,
  Leaf,
} from '../../setting-panel/property-setting/rich-text/helper';
import type { MiniTextLeafProps } from '../../setting-panel/property-setting/rich-text/helper';

const { useCallback, useMemo } = React;

export interface MiniRichTextProps {
  viewmode?: boolean;
  value: Array<Descendant>;
  onValueChange: (value: Descendant[]) => void;
}

const MiniRichText = (props: MiniRichTextProps) => {
  const { value, onValueChange } = props;

  const renderElement = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      element: SlateElement;
    }) => <Element {...props} />,
    [],
  );

  const renderLeaf = useCallback((props: MiniTextLeafProps) => <Leaf {...props} />, []) as any;
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleValueChange = (newValue: Descendant[]) => {
    if (!Array.isArray(newValue)) {
      console.warn('MiniText: onChange: newValue is not an array', newValue);
      return;
    }
    onValueChange?.(newValue);
  };
  editor.children = value;

  return (
    <div>
      <Slate editor={editor} initialValue={value} onValueChange={handleValueChange}>
        <div>
          <HoveringToolbar />
          <Editable
            readOnly={props.viewmode}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Input your content here"
          />
        </div>
      </Slate>
    </div>
  );
};

export default MiniRichText;
