import { nanoid } from 'nanoid';

import { DMEData, generalSettings, type DME } from '../..';
import { arrayHasCommonElement } from '../../core/utils';
import { EntityHeroText } from './entity';

const heroTextWidget: DME.Widget = {
  // ?category options: widget, layout, form, chart, advanced
  category: 'media',
  icon: 'TextFormatOutlined',
  name: 'Hero text',
  type: 'hero-text',
  widgetType: 'mixed',
  //todo: support children: Array or [prop: string]: object
  //childen :{hero: 'image', list: 'list:button'}
  //or {hero: 'image', list: {type: 'list', children:{'list:button', <variant definition>}}
  events: {
    createBlock: (): DMEData.CreatedBlock<EntityHeroText> => {
      return {
        type: 'hero-text',
        data: {},
        children: [
          {
            id: nanoid(),
            type: 'image',
            isEmbed: true,
            data: {
              src: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              settings: {},
            },
          },
          {
            id: nanoid(),
            type: 'list',
            isEmbed: true,
            allowedTypes: ['heading', 'text', 'button', 'line', 'list'],
            data: { settings: { padding: 10 }, general: { padding: 10 } },
            // data: { settings: { general: { padding: 10 } } },
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
        ],
      };
    },
    embedConfig: {
      enabledSettings: (settings, styles, context) => {
        const settingResult = settings.filter((item) => {
          if (item.category !== 'style') {
            return true;
          } else {
            if (context.relativePath.length === 1) {
              if (context.relativePath[0] === 0) {
                //image
                if (!item.styleTags) {
                  return true;
                }
                return arrayHasCommonElement(item.styleTags, ['container']);
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
        if (context.relativePath[0] === 1 && context.relativePath.length === 2) {
          enabledStyles = undefined;
        }
        return { settings: settingResult, enabledStyles: enabledStyles };
      },
      hasOwnView: (context) => {
        if (context.relativePath.length >= 2 && context.relativePath[0] === 1) {
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
      category: 'style',
      parameters: {
        options: [
          { text: 'Left', value: 'left' },
          { text: 'Right', value: 'right' },
        ],
      },
    },
    {
      name: 'Full hero',
      category: 'style',
      property: '.heroFullWidth',
      settingComponent: 'switch',
    },
    ...generalSettings.filter((item) => !item.styleTags?.includes('block')),
  ],
};

export default heroTextWidget;
