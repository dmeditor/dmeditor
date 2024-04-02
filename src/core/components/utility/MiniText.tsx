import * as React from 'react';
import type { EntityText } from 'dmeditor/components/widgets/text/entity';
import {
  Element,
  HoveringToolbar,
  Leaf,
} from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import type { MiniTextLeafProps } from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import { DME } from 'dmeditor/types/dmeditor';
import { createEditor } from 'slate';
import type { Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

const { useCallback, useMemo } = React;

interface MiniTextProps extends DME.WidgetRenderProps<EntityText> {
  onValueChange: (value: Descendant[]) => void;
}

const MiniText = (props: MiniTextProps) => {
  const { blockNode, rootClasses, onValueChange } = props;
  const {
    data: { value },
  } = blockNode;

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
    <div className={rootClasses}>
      <Slate editor={editor} initialValue={value} onValueChange={handleValueChange}>
        <div>
          <HoveringToolbar />
          <Editable
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Input your content here"
          />
        </div>
      </Slate>
    </div>
  );
};

export default MiniText;
