import { nanoid } from 'nanoid';

import SampleWidget from './SampleWidget';
import SettingInput from './SettingInput';
import { registerSettingComponent, registerWidget, registerWidgetVariant } from 'Src/core';
import {
  getWidget,
  getWidgetVariant,
  registerWidgetStyle,
  registerWidgetStyleOption,
} from 'Src/core/components/widgets';
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
          property: 'settings.backgroundColor',
        },
        {
          name: 'Width',
          settingComponent: 'setting_input',
          property: 'settings.width',
        },
      ],
      events: {
        createBlock: () => ({
          id: nanoid(),
          type: 'sample',
          data: {
            level: 2,
            settings: {
              width: 100,
              backgroundColor: '#cccccc',
            },
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
    identifier: 'simple',
    name: 'Simple heading',
    enabledStyles: ['_'],
    enabledSettings: ['.value', 'settings.color'],
    getDefaultData: () => {
      return {
        id: nanoid(),
        type: 'heading:simple',
        style: { _: 'gradient' },
        data: { value: 'Simple heading', level: 2, settings: {} },
      };
    },
  });
  registerWidgetStyleOption('heading:simple', [
    {
      identifier: 'gradient',
      name: 'Gradient',
      cssStyle: `
        text-align:center;
        padding: 10px;
        color: white;
        background: linear-gradient(172deg, rgba(232,23,23,1) 0%, rgba(231,159,255,1) 66%, rgba(255,216,246,1) 100%);        
    `,
      icon: '',
    },
  ]);

  registerWidgetVariant({
    widget: 'list',
    identifier: 'article-block',
    name: 'Article block',
    enabledSettings: [],
    allowedTypes: ['heading:simple'],
    //todo: use property?
    getDefaultData: (): DMEData.Block<any> => {
      const variant = getWidgetVariant('heading', 'gradient');
      let variantData: any = [];
      if (variant && variant.getDefaultData) {
        variantData = [variant.getDefaultData()];
      }

      const headingData = [getWidget('heading')?.events.createBlock()] || [];
      return {
        id: nanoid(),
        type: 'list:article-block',
        data: { settings: {} },
        children: [...headingData, ...variantData],
      };
    },
  });

  registerWidgetStyle('heading', {
    identifier: 'margin',
    name: 'Margin',
    display: 'inline-block',
    options: [
      {
        identifier: 'big-margin',
        name: 'Big',
        cssStyle: `
         margin-top: 50px;
         margin-bottom: 50px;
      `,
        icon: '',
      },
    ],
  });

  registerWidgetStyleOption('button', [
    {
      identifier: 'project-primary',
      name: 'Project primary',
      cssStyle: `
        padding: 8px 20px;
        background:green;
        color: white;
        border-radius: 16px;
      `,
    },
  ]);

  registerWidgetStyleOption('button', [
    {
      identifier: 'theme-primary',
      name: 'Theme primary',
      cssStyle: `
        padding: 8px 20px;
        background:var(--project-main-color);
        color: white;
        border-radius: 16px;
      `,
    },
  ]);

  registerWidgetStyleOption(
    'heading',
    [
      {
        identifier: 'small-margin',
        name: 'Small',
        cssStyle: `
       margin-top: 10px;
       margin-bottom: 10px;      
    `,
        icon: '',
      },
    ],
    'margin',
  );

  registerWidgetStyleOption('heading', [
    {
      identifier: 'theme',
      name: 'Theme - heading',
      cssStyle: `
        margin-top: 10px;
        margin-bottom: 10px;
        
        color: var(--project-main-color);
        padding: 10px;

        border-bottom: 2px solid var(--project-main-bg-color);
        border-left: 4px solid var(--project-main-bg-color);
     `,
    },
  ]);

  registerWidgetStyleOption(
    'heading',
    [
      {
        identifier: 'big-space',
        name: 'Big space',
        cssClasses: { root: 'pt-6 leading-3 text-3xl' },
        cssStyle: `
       padding: 50px;
       background: #efefef
    `,
        icon: '',
      },
    ],
    '_',
  );

  registerWidgetStyleOption('layout-2columns', [
    {
      identifier: 'project-layout',
      name: 'Project layout',
      cssStyle: `
        grid-template-columns: 33.3% 66.7%;
        & > .dme-w-column1{
          padding: 10px;
          background: #d9d9ff;
        }
        & > .dme-w-column2{
          padding: 10px;
          background: #eaeaff;
        }
    `,
      icon: '',
    },
  ]);
};

export default registerSampleWidget;
