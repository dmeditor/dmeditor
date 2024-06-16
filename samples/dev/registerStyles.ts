import { nanoid } from 'nanoid';

import {
  DMEData,
  registerWidgetStyle,
  registerWidgetStyleOption,
  registerWidgetVariant,
} from '../../src';
import { defaultStyles } from './defaultStyles';

export const registerStyles = () => {
  for (const widget of Object.keys(defaultStyles)) {
    registerWidgetStyleOption(widget, [defaultStyles[widget]]);
  }

  //heading style
  registerWidgetStyle('heading', {
    identifier: 'margin',
    name: 'Margin',
    display: 'inline-block',
    options: [
      {
        identifier: 'big-margin',
        name: 'Big',
        settings: { 'settings.general.padding': { value: 10 } },
        cssStyle: `
         margin-top: 50px;
         margin-bottom: 50px;
      `,
        icon: '',
      },
    ],
  });

  //button style
  registerWidgetStyleOption('button', [
    {
      identifier: 'project-primary',
      name: 'Project primary',
      cssStyle: `
      .dme-w-button{
        padding: 8px 20px;
        background:green;
        color: white;
        border-radius: 16px;
      }
      `,
    },
  ]);

  //theme related style for button
  registerWidgetStyleOption('button', [
    {
      identifier: 'theme-primary',
      name: 'Theme primary',
      cssStyle: `
      .dme-w-button{
        padding: 8px 20px;
        background:var(--project-main-color);
        color: white;
        border-radius: 16px;
      }
      `,
    },
  ]);

  //heading style
  registerWidgetStyleOption(
    'heading',
    [
      {
        identifier: 'small-margin',
        name: 'Small',
        settings: { 'settings.general.padding': { value: 5, status: 'disabled' } },
        cssStyle: `
       margin-top: 10px;
       margin-bottom: 10px;
    `,
        icon: '',
      },
    ],
    'margin',
  );

  //theme related style for heading
  registerWidgetStyleOption('heading', [
    {
      identifier: 'theme',
      settings: {
        'settings.general.padding': { value: 20 },
        'settings.general.marginTop': { value: 10, status: 'disabled' },
      },
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
        settings: {
          'settings.general.padding': { value: 80, status: 'disabled' },
          'settings.general.marginTop': { value: 10, status: 'hidden' },
        },
        cssStyle: `
       background: #efefef
    `,
        icon: '',
      },
    ],
    '_',
  );

  //Grid style
  registerWidgetStyleOption('grid', [
    {
      identifier: 'dark-space',
      name: 'Dark space',
      cssStyle: `
      grid-gap: 10px;
      & > div{
        padding: 10px;
        background: #666666;
        border: 1px solid #000000;
      }
  `,
      icon: '',
    },
  ]);

  //Layout style
  registerWidgetStyleOption('layout-2columns', [
    {
      identifier: 'project-layout',
      name: 'Project layout',
      cssStyle: `
         .dme-w-column1{
          padding: 10px;
          background: #d9d9ff;
        }
         .dme-w-column2{
          padding: 10px;
          background: #eaeaff;
        }
    `,
      icon: '',
    },
  ]);
};
