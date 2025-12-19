import * as React from 'react';

import { BlockListRender, DMEData } from '../../../src';

export const LayoutRender = (props: { list: DMEData.Block[]; mode: 'edit' | 'view' }) => {
  const { list, mode } = props;

  return (
    <div>
      <BlockListRender blockData={list} path={[]} mode={mode} />
    </div>
  );
};
