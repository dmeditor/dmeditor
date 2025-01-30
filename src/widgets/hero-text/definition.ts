import { getCommonSettings } from 'dmeditor/core/setting-panel/property-setting';
import { nanoid } from 'nanoid';

import { DMEData, generalSettings, i18n, type DME } from '../..';
import { arrayHasCommonElement } from '../../core/utils';
import { EntityHeroText, EntityHeroTextChildren } from './entity';

const heroTextWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'media',
  icon: 'TextFormatOutlined',
  name: i18n('Hero text', 'widget'),
  type: 'hero-text',
  widgetType: 'mixed',
  //todo: support children: Array or [prop: string]: object
  //childen :{hero: 'image', list: 'list:button'}
  //or {hero: 'image', list: {type: 'list', children:{'list:button', <variant definition>}}
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityHeroText, EntityHeroTextChildren> => {
      return {
        type: 'hero-text',
        data: { gap: 10 },
        children: {
          hero: {
            id: nanoid(),
            type: 'image',
            isEmbed: true,
            data: {
              src: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              settings: {},
            },
          },
          list: {
            id: nanoid(),
            type: 'list',
            isEmbed: true,
            allowedTypes: ['heading', 'text', 'button', 'line', 'list'],
            data: {},
            children: [
              {
                id: nanoid(),
                type: 'heading',
                isEmbed: true,
                data: {
                  value: 'Heading 2',
                  level: 2,
                },
              },
            ],
          },
        },
      };
    },
    embedConfig: {
      enabledSettings: (settings, styles, context) => {
        const settingResult = settings.filter((item) => {
          if (item.category !== 'style') {
            return true;
          } else {
            if (context.relativePath.length === 1) {
              if (context.relativePath[0] === 'hero') {
                //image
                if (!item.styleTags) {
                  return true;
                }
                return arrayHasCommonElement(item.styleTags, ['core', 'container']);
              } else {
                //list
                return item.styleTags?.includes('container');
              }
            }
            return true;
          }
        });
        let enabledStyles: any = {};
        //list elements
        if (context.relativePath[0] === 'list' && context.relativePath.length === 2) {
          enabledStyles = undefined;
        }
        return { settings: settingResult, enabledStyles: enabledStyles };
      },
      hasOwnView: (context) => {
        if (context.relativePath.length >= 2 && context.relativePath[0] === 'list') {
          return true;
        }
        return false;
      },
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Hero position',
      property: '.heroPosition',
      settingComponent: 'button-group',
      identifier: 'hero-text-hero-position',
      category: 'style',
      parameters: {
        options: [
          { text: 'Left', value: 'left' },
          { text: 'Right', value: 'right' },
        ],
      },
    },
    {
      name: 'Gap',
      identifier: 'hero-text-gap',
      category: 'style',
      property: '.gap',
      settingComponent: 'range',
      parameters: { min: 0, max: 50 },
    },
    {
      name: 'Full hero',
      identifier: 'full-hero',
      category: 'style',
      property: '.heroFullWidth',
      settingComponent: 'switch',
    },
    ...getCommonSettings('container'),
  ],
};

export default heroTextWidget;
