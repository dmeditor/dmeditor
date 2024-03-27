import * as React from 'react';
import { useEditorStore } from 'dmeditor/main/store';
import {
  Element,
  HoveringToolbar,
  Leaf,
} from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import { DME } from 'dmeditor/types/dmeditor';
import { createEditor, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { EntityText } from './entity';

const { useCallback, useMemo } = React;

const Text = (props: DME.WidgetRenderProps<EntityText>) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value },
  } = blockNode;
  const { updateSelectedBlock } = useEditorStore();
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
    }) => <Leaf {...props} />,
    [],
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleChange = (v) => {
    if (props.active) {
      updateSelectedBlock<EntityText>((entity) => {
        entity.value = v;
      });
    }
  };

  editor.children = value;

  return (
    <div className={rootClasses}>
      <Slate editor={editor} onChange={handleChange} initialValue={value}>
        <div>
          <HoveringToolbar />
          <Editable
            // readOnly={props.active ? false : true}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Input your content here"
          />
        </div>
      </Slate>
    </div>
  );
};

export default Text;
