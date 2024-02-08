import {
  addCustomDefinition,
  addLayoutDefinition,
  addWidgetDefinition,
  registerWidgetRender,
} from './components/widgets';
import {
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerPropertyComponent,
  registerWidgetProperty,
} from './setting-panel/register';

export { DMEditor } from 'Core/main/designer/DMEditor';

export { BlockRender as DMRenderer } from 'Core/main/renderer/index';

const DMEditorToolKit = {
  addWidgetDefinition,
  addLayoutDefinition,
  addCustomDefinition,
  registerWidgetRender,
  registerPropertyComponent,
  registerCommonProperty,
  registerCustomProperty,
  registerEventProperty,
  registerWidgetProperty,
};

export { DMEditorToolKit };
