import { nanoid } from 'nanoid';

import { dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';
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
    createBlock: (): DMEData.Block<EntityHeroText> => {
      const defaultStyle = dmeConfig.widgets['hero-text']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};

      return {
        id: nanoid(),
        type: 'hero-text',
        data: {},
        ...styleObj,
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
            allowedTypes: ['heading', 'text', 'button'],
            data: { settings: { general: { padding: 10 } } },
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
    childSettings: (path: Array<number>, blockData: DMEData.Block) => {
      const result: DME.ChildSettings = {};
      if (path.length === 1) {
        result.styleTags = [];
      } else {
        result.styleTags = ['core'];
      }
      return result;
    },
    updateData: () => {},
  },
  settings: [
    {
      name: 'Hero position',
      property: '.heroPosition',
      settingComponent: 'button-group',
      category: 'block',
      parameters: {
        options: [
          { text: 'Left', value: 'left' },
          { text: 'Right', value: 'right' },
        ],
      },
    },
    {
      name: 'Full hero',
      category: 'block',
      property: '.heroFullWidth',
      settingComponent: 'switch',
    },
    ...generalSettings.filter((item) => !item.styleTags?.includes('block')),
  ],
};

export default heroTextWidget;
