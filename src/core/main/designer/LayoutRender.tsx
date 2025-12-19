import { BlockListRender } from '../../components/block-list-render';
import { dmeConfig } from '../../config';
import { DMEData } from '../../types/dmeditor';

export const LayoutRender = (props: { list: DMEData.Block[]; mode: 'edit' | 'view' }) => {
  const { list, mode } = props;

  const LayoutRenderComponent = dmeConfig.callbacks.layoutRender;
  if (LayoutRenderComponent) {
    return <LayoutRenderComponent list={list} mode={mode} />;
  }
  return <BlockListRender blockData={list} path={[]} mode={mode} />;
};
