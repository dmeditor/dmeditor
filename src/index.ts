export { useEditorStore } from './core/main/store';
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
} from './core/utils';
export { getWidget, getWidgetVariant } from './core/utils';
export { generalSettings } from './core/setting-panel/property-setting';
// register setting component
export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './core/setting-panel/register';
export { dmeServerSideLoad } from './core/ssr';
export { dmeConfig, setDMEditorConfig, setDMEditorCallback } from './core/config';
export { DMEditorView, BlockRender, BlockListRender } from './core/main/renderer/index';
// hooks
export { useDevice } from './core/hooks/useDeivce';

export * from './core/i18n';
export * from './core/utility';
export * from './core/types/dmeditor';
export * from './core/main/designer/DMEditor';
