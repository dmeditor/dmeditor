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
    enabled_styles: ['_'],
    enabled_settings: ['settings.color'],
    getDefaultData: () => {
      return {
        id: nanoid(),
        type: 'heading:gradient',
        data: { value: 'Gradient heading', level: 3, settings: {color:'red'} },
      };
    },
  }, [
    {
      identifier:'test',
      name:'Test style',
      options:[{
        identifier:'test-item',
        name:'Test item',
        cssStyle: `
           background: #cccccc;
        `,
        icon: ''  
      }
  ]}]);

  registerWidgetVariant({
    widget: 'list',
    identifier: 'article-block',
    name: 'Article block',
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
  
  registerWidgetStyle('heading', {
    identifier:'margin',
    name:'Margin',
    options:[{
      identifier:'big-margin',
      name:'Big margin',
      cssStyle: `
         margin-top: 50px;
         margin-bottom: 50px;
      `,
      icon: ''  
    }]
  })

  registerWidgetStyleOption('heading', 
  [{
    identifier:'small-margin',
    name:'Small margin',
    cssStyle: `
       margin-top: 10px;
       margin-bottom: 10px;
    `,
    icon: ''  
  }], 'margin')

  registerWidgetStyleOption('heading', 
  [{
    identifier:'big-space',
    name:'Big space',
    cssStyle: `
       padding: 50px;
       background: #efefef
    `,
    icon: ''  
  }], '_')
  
};

export default registerSampleWidget;
