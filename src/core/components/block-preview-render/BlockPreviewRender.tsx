import * as React from 'react';
import { useMemo } from 'react';

import type { DMEData } from '../../types';
import { getWidget, getWidgetComponent, getWidgetStyle } from '../../utils/register';

export const BlockPreviewRender = (props: { blockData: DMEData.Block; mode?: 'list' }) => {
  const { blockData } = props;

  const PreviewComponent = useMemo(() => {
    const com = getWidgetComponent(blockData.type);
    return com && com.preview;
  }, [blockData.id]);

  if (!PreviewComponent) {
    return getWidget(blockData.type).name;
  }

  return (
    <div>
      <PreviewComponent blockData={blockData} mode={props.mode} />
    </div>
  );
};
