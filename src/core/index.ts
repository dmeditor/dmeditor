import {
  addCustomDefinition,
  addLayoutDefinition,
  addWidgetDefinition,
  registerWidget,
} from './components/widgets';
import {
  registerCommonProperties,
  registerComponent,
  registerEventProperties,
  registerWidgetProperties,
} from './setting-panel/register';

// import * as DMRegister from './register';

export { DMEditor } from 'Core/main/designer/DMEditor';

export { BlockRender as DMRenderer } from 'Core/main/renderer/index';

const DMEditorToolKit = {
  addWidgetDefinition,
  addLayoutDefinition,
  addCustomDefinition,
  registerWidget,
  registerComponent,
  registerCommonProperties,
  registerEventProperties,
  registerWidgetProperties,
};

export { DMEditorToolKit };
