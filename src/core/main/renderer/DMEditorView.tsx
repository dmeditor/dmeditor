import { useEffect } from 'react';
import { css } from '@emotion/css';
import { queryFromLocaton } from 'dmeditor/core/utils';

import type { DMEData } from '../../..';
import { useDevice } from '../../..';
import { BlockListRender } from '../../components/block-list-render/BlockListRender';
import { getPageTheme } from '../../components/page';
import { dmeConfig } from '../../config';
import { useGlobalVars } from '../store';
import { DMEditorViewStyle } from './styled';

export interface DMEditorViewProps {
  data: DMEData.BlockList;
  theme?: string;
  projectStyle?: string;
}

const DMEditorView = (props: DMEditorViewProps) => {
  const { data, theme, projectStyle } = props;

  const getProjectCss = () => {
    return dmeConfig.general.projectStyles[props.projectStyle || 'default'];
  };

  const device = useDevice();

  const getThemeCss = () => {
    const pageTheme = getPageTheme(theme || 'default');
    if (pageTheme) {
      return pageTheme.cssStyle;
    } else {
      return undefined;
    }
  };

  const { vars, initVars } = useGlobalVars();

  useEffect(() => {
    if (Object.keys(vars).length === 0) {
      const location = window.location.search;
      const locationVars = queryFromLocaton(location);
      initVars(locationVars);
    }
  }, []);

  return (
    <DMEditorViewStyle
      projectStyle={getProjectCss()}
      themeStyle={getThemeCss()}
      className={'dmeditor-view ' + (device != '' ? 'dme-viewmode-' + device + ' ' : '')}
    >
      <BlockListRender blockData={data || []} path={[]} mode="view" />
    </DMEditorViewStyle>
  );
};

export { DMEditorView };
