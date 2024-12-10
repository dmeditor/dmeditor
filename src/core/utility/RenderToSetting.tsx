import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useWidgetSettingStore } from '../main/store';

export const RenderToSetting = (props: { children?: any }) => {
  const { mainLoaded } = useWidgetSettingStore();

  let container = null;
  if (mainLoaded) {
    container = document.getElementById('dme-widget-setting-container');
  }

  return <>{mainLoaded && container && createPortal(props.children, container)}</>;
};
