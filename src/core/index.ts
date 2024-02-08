import {
  addCustomDefinition,
  addLayoutDefinition,
  registerWidget,
} from './components/widgets';
import {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerSettingComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { DMEditor } from 'Core/main/designer/DMEditor';

export { BlockRender as DMRenderer } from 'Core/main/renderer/index';

const DMEditorToolKit = {
  addLayoutDefinition,
  addCustomDefinition,
  registerWidget,
  registerSettingComponent,
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerWidgetProperty,
};

export { DMEditorToolKit };
