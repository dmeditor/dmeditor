import * as React from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { SlateFun } from '../../../utils/Slate';
import { EntityText } from './entity';
import { useEditorStore } from 'Src/core/main/store';
import {
  HoveringToolbar,
  resetNodes,
} from 'Src/core/setting-panel/property-setting/rich-text/helper';

const { Element, Leaf } = SlateFun;
const { useCallback, useMemo, useEffect } = React;

const Text = (props: any) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value },
  } = blockNode;
  const { updateSelectedBlock } = useEditorStore();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // useEffect(() => {
  //   resetNodes(editor, { nodes: value });
  // }, [value]);

  const handleChange = (v) => {
    updateSelectedBlock<EntityText>((entity) => {
      entity.value = v;
    });
  };

  editor.children = value;

  return (
    <div className={rootClasses}>
      <Slate editor={editor} onChange={handleChange} value={value}>
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
