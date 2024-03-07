import * as React from 'react';
import {
  HoveringToolbar,
  resetNodes,
} from 'dmeditor/setting-panel/property-setting/rich-text/helper';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { SlateFun } from '../../../utils/Slate';

const { Element, Leaf } = SlateFun;
const { useCallback, useMemo, useEffect } = React;

const Text = (props: any) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value },
  } = blockNode;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useEffect(() => {
    resetNodes(editor, { nodes: value });
  }, [value]);

  return (
    <div className={rootClasses}>
      <Slate editor={editor} value={value}>
        <div>
          <HoveringToolbar />
          <Editable
            readOnly={true}
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
