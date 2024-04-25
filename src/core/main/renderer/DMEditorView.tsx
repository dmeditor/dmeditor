import { css } from '@emotion/css';

import type { DMEData } from '../../../core';
import { useDevice } from '../../../core';
import { BlockListRender } from '../../components/block-list-render/BlockListRender';
import { getPageTheme } from '../../components/page';
import { dmeConfig } from '../../config';

export interface DMEditorViewProps {
  data: DMEData.BlockList;
  theme?: string;
  projectStyle?: string;
}

const DMEditorView = (props: DMEditorViewProps) => {
  const { data, theme, projectStyle } = props;

  const getProjectCss = () => {
    return css(dmeConfig.general.projectStyles[props.projectStyle || 'default']);
  };

  const device = useDevice();

  const getThemeCss = () => {
    const pageTheme = getPageTheme(theme || 'default');
    if (pageTheme) {
      return css(pageTheme.cssStyle);
    } else {
      return undefined;
    }
  };

  return (
    <div
      className={
        'dmeditor-view ' +
        (device != '' ? 'dme-viewmode-' + device + ' ' : '') +
        getProjectCss() +
        ' ' +
        getThemeCss()
      }
    >
      <BlockListRender blockData={data || []} path={[]} mode="view" />
    </div>
  );
};

export { DMEditorView };
