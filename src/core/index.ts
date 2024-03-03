export { useEditorStore } from './main/store';

export { DMEditor } from 'Core/main/designer/DMEditor';
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

export { BlockRender as DMRenderer } from 'Core/main/renderer/index';
export * from './types/dmeditor';
