import { nanoid } from 'nanoid';

import type { DMEData } from '../../../src';
import {
  generalSettings,
  getWidget,
  getWidgetVariant,
  registerSettingComponent,
  registerWidget,
  registerWidgetStyle,
  registerWidgetStyleOption,
  registerWidgetVariant,
} from '../../../src';
import { sampleWidgetDef } from './definition';
import SampleWidget from './SampleWidget';
import SettingInput from './setting-input/SettingInput';

const registerSampleWidget = function () {
  registerWidget(sampleWidgetDef, {
    render: SampleWidget,
  });
  registerSettingComponent('setting_input', SettingInput);
};

export default registerSampleWidget;
