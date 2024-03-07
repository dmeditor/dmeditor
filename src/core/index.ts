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

export { serverLoad } from './ssr';

export { registerTheme } from './components/page';

export { DMEditorView, BlockRender, BlockListRender } from 'dmeditor/main/renderer/index';
export * from './types/dmeditor';
