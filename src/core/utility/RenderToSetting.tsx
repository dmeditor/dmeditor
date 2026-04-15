import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useWidgetSettingStore } from '../main/store';

export const RenderToSetting = (props: {
  containerId?: string;
  blockId?: string;
  children?: any;
}) => {
  const { mainLoaded, containerLoaded } = useWidgetSettingStore();

  let container = null;
  const containerId = props.containerId;
  if (!containerId && mainLoaded) {
    const blockId = props.blockId;
    if (blockId) {
      container = document.getElementById('dme-widget-setting-container-' + blockId);
    } else {
      const containerList = document.getElementsByClassName('dmee-widget-setting-container');
      if (containerList.length > 0) {
        container = containerList[0];
      }
    }
  } else if (containerId && containerLoaded[containerId]) {
    container = document.getElementById('dme-setting-render-container-' + containerId);
  }

  return <>{mainLoaded && container && createPortal(props.children, container)}</>;
};
