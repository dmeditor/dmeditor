export { useEditorStore } from './main/store';

export { DMEditor } from 'dmeditor/main/designer/DMEditor';
export {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidget,
  registerWidgetVariant,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from './components/widgets';
export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { dmeServerSideLoad } from './ssr';

export { dmeConfig, setDMEditorConfig, setDMEditorCallback } from './config';

export { DMEditorView, BlockRender, BlockListRender } from 'dmeditor/main/renderer/index';
export * from './types/dmeditor';
