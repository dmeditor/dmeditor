import { useMemo } from 'react';
import { css } from '@emotion/css';

import { BlockListRender } from './BlockListRender';
import { getPageTheme } from 'Src/core/components/page';
import { DME, DMEData } from 'Src/core/types/dmeditor';

export interface DMEditorViewProps {
  data: DMEData.BlockList;
  theme?: string;
}

const DMEditorView = (props: DMEditorViewProps) => {
  const { data, theme } = props;

  const getThemeCss = () => {
    const pageTheme = getPageTheme(theme || 'default');
    if (pageTheme) {
      return css(pageTheme.cssStyle);
    } else {
      return undefined;
    }
  };

  return (
    <div className={getThemeCss()}>
      <BlockListRender blockData={data} path={[]} mode="view" />
    </div>
  );
};

export { DMEditorView };
