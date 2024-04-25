export { useEditorStore } from './main/store';

export { DMEditor } from './main/designer/DMEditor';

/**
 * register widget
 */
export {
  addCustomDefinition,
  addLayoutDefinition,
  registerIcon,
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
  registerWidgetVariant,
} from './utils/register';

export { getWidget, getWidgetVariant } from './utils/register';

/**
 * register setting panel property
 */
export {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { useDevice } from './utils/utilx';

export { dmeServerSideLoad } from './ssr';
export * from './utility';

export { dmeConfig, setDMEditorConfig, setDMEditorCallback } from './config';

export { DMEditorView, BlockRender, BlockListRender } from './main/renderer/index';
export * from './types/dmeditor';
