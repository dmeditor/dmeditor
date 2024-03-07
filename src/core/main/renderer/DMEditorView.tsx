import { useMemo } from 'react';
import { css } from '@emotion/css';
import { getPageTheme } from 'dmeditor/components/page';
import { DME, DMEData } from 'dmeditor/types/dmeditor';

import { BlockListRender } from './BlockListRender';

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
