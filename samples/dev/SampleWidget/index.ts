import { nanoid } from 'nanoid';

import SampleWidget from './SampleWidget';
import SettingInput from './SettingInput';
import { registerSettingComponent, registerWidget, registerWidgetVariant } from 'Src/core';
import { getWidget, getWidgetVariant, registerWidgetStyle, registerWidgetStyleOption } from 'Src/core/components/widgets';
import { DMEData } from 'Src/core/types';

const registerSampleWidget = function () {
  registerWidget(
    {
      type: 'sample',
      name: 'Sample widget',
      category: 'widget',
      icon: 'A',
      settings: [
        {
          name: 'Background Color',
          settingComponent: 'color',
          category: 'settings',
          property: 'settings.backgroundColor',
        },
        {
          name: 'Width',
          settingComponent: 'setting_input',
          category: 'settings',
          property: 'settings.width',
        },
      ],
      events: {
        createBlock: () => ({
          level: 2,
          settings: {
            width: 100,
            backgroundColor: '#cccccc',
          },
        }),
        updateData: () => void 0,
      },
    },
    SampleWidget,
  );
  registerSettingComponent('setting_input', SettingInput);

  registerWidgetVariant({
    widget: 'heading',
    identifier: 'gradient',
    name: 'Gradient heading',
    style: 'big-space',
    enabled_settings: ['settings.color'],
    getDefaultData: () => {
      return {
        id: nanoid(),
        type: 'heading:gradient',
        data: { value: 'Gradient heading', level: 3, settings: {color:'red'} },
      };
    },
  });

  registerWidgetVariant({
    widget: 'list',
    identifier: 'article-block',
    name: 'Article block',
    style: { align: 'center', space: 'big-space' },
    enabled_settings: [],
    allowed_widgets: ['heading:gradient'],
    //todo: use property?
    getDefaultData: (): DMEData.Block<any> => {
      const variant = getWidgetVariant('heading', 'gradient');
      let variantData: any = [];
      if (variant && variant.getDefaultData) {
        variantData = [variant.getDefaultData()];
      }

      const headingData = [getWidget('heading')?.events.createBlock()]||[];
      return {
        id: nanoid(),
        type: 'list:article-block',
        data: { settings: {} },
        children: [...headingData, ...variantData],
      };
    },
  });
  
  registerWidgetStyleOption('heading', 
  {
    identifier:'big-space',
    name:'Big space',
    cssStyle: `
       padding: 50px;
       background: #efefef
    `,
    icon: ''  
  }, '_')
  
};

export default registerSampleWidget;
