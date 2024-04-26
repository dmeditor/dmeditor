export { useEditorStore } from './main/store';
export { DMEditor } from './main/designer/DMEditor';
// register widgets
export {
  addCustomDefinition,
  addLayoutDefinition,
  registerIcon,
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
  registerWidgetVariant,
  registerDefaultWidgets,
} from './utils';
export { getWidget, getWidgetVariant } from './utils';
// register setting component
export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';
export { dmeServerSideLoad } from './ssr';
export * from './utility';
export { dmeConfig, setDMEditorConfig, setDMEditorCallback } from './config';

export { DMEditorView, BlockRender, BlockListRender } from './main/renderer/index';
export * from './types/dmeditor';

// hooks
export { useDevice } from './hooks/useDeivce';
