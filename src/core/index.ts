export { useEditorStore } from './main/store';

export { DMEditor } from 'dmeditor/main/designer/DMEditor';
export {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidget,
  registerWidgetVariant,
} from './components/widgets';
export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { registerTheme } from './components/page';

export { BlockRender as DMRenderer } from 'dmeditor/main/renderer/index';
export * from './types/dmeditor';
