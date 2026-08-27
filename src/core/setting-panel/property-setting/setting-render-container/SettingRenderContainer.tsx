import { useEffect } from 'react';

import { useWidgetSettingStore } from '../../../main/store';
import type { DME } from '../../../types';

const SettingRenderContainer = (props: DME.SettingComponentProps) => {
  const { parameters } = props;

  const id = parameters?.id as string;
  const { setContainerLoaded } = useWidgetSettingStore();

  useEffect(() => {
    if (!id) return;
    setContainerLoaded(id, true);
    return () => {
      setContainerLoaded(id, false);
    };
  }, [id]);

  return <div id={'dme-setting-render-container-' + id}></div>;
};

export default SettingRenderContainer;
