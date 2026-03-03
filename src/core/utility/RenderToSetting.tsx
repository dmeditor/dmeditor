import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useWidgetSettingStore } from '../main/store';

export const RenderToSetting = (props: { containerId?: string; children?: any }) => {
  const { mainLoaded, containerLoaded } = useWidgetSettingStore();

  let container = null;
  const id = props.containerId;
  if (!id && mainLoaded) {
    container = document.getElementById('dme-widget-setting-container');
  } else if (id && containerLoaded[id]) {
    container = document.getElementById('dme-setting-render-container-' + id);
  }

  return <>{mainLoaded && container && createPortal(props.children, container)}</>;
};
