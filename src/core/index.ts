export { useEditorStore } from './main/store';

export { DMEditor } from './main/designer/DMEditor';
export {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidget,
  registerWidgetVariant,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from './components/widgets';

export { useGetDevice } from './utils/utilx';

export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { registerIcon } from './components/icon/icon-data';

export { dmeServerSideLoad } from './ssr';
export * from './components/utility';

export { dmeConfig, setDMEditorConfig, setDMEditorCallback } from './config';

export { DMEditorView, BlockRender, BlockListRender } from 'dmeditor/main/renderer/index';
export * from './types/dmeditor';
