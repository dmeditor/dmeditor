import type { DME } from '../../../types';

const SettingRenderContainer = (props: DME.SettingComponentProps) => {
  const { parameters } = props;

  const id = parameters?.id;

  return <div id={'dme-setting-render-container-' + id}></div>;
};

export default SettingRenderContainer;
