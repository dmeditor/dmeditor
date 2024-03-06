import { BlockListRender } from '../renderer/BlockListRender';
import { DME, DMEData } from 'Src/core/types/dmeditor';

export interface DMEditorViewProps {
  data: DMEData.BlockList;
}

const DMEditorView = (props: DMEditorViewProps) => {
  return <BlockListRender blockData={props.data} path={[]} mode="view" />;
};

export { DMEditorView };
