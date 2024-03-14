import * as React from 'react';
import { useEditorStore } from 'dmeditor/main/store';
import {
  Element,
  HoveringToolbar,
  Leaf,
  resetNodes,
} from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import { DME } from 'dmeditor/types/dmeditor';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { SlateFun } from '../../../utils/Slate';
import { EntityText } from './entity';

// const { Element, Leaf } = SlateFun;
const { useCallback, useMemo, useEffect } = React;

const Text = (props: DME.WidgetRenderProps<EntityText>) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value },
  } = blockNode;
  const { updateSelectedBlock } = useEditorStore();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
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
            readOnly={props.active ? false : true}
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
