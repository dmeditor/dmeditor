import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useWidgetSettingStore } from '../main/store';

export const RenderToSetting = (props: { containerId?: string; children?: any }) => {
  const { mainLoaded } = useWidgetSettingStore();

  let container = null;
  if (mainLoaded) {
    const id = props.containerId
      ? 'dme-setting-render-container-' + props.containerId
      : 'dme-widget-setting-container';
    container = document.getElementById(id);
  }

  return <>{mainLoaded && container && createPortal(props.children, container)}</>;
};
