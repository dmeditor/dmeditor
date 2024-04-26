import { nanoid } from 'nanoid';

import type { DMEData } from '../../core';
import { registerWidget, registerWidgetStyle, registerWidgetVariant } from '../../core';
import heroTextWidget from './definition';
import { HeroText } from './HeroText';

const register = () => {
  registerWidget(heroTextWidget, { render: HeroText });
  registerWidgetVariant({
    widget: 'hero-text',
    identifier: 'image',
    name: 'Image text',
    allowedTypes: ['heading', 'list:button'],
    getDefaultData: (): DMEData.Block => {
      return {
        id: nanoid(),
        type: 'hero-text:image',
        data: {
          heroPosition: 'left',
        },
        style: { space: 'big' },
        children: [
          {
            id: nanoid(),
            type: 'heading',
            data: {
              value: 'This is a new block',
              level: 2,
            },
          },
          {
            id: nanoid(),
            type: 'list',
            data: { align: 'right' },
            children: [
              {
                id: nanoid(),
                type: 'heading',
                data: {
                  value: 'This is a new block 1',
                  level: 2,
                },
              },
              {
                id: nanoid(),
                type: 'list:button',
                data: { direction: 'horizontal' },
                children: [
                  {
                    id: nanoid(),
                    type: 'button',
                    data: { value: 'Button' },
                    style: { type: 'primary' },
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  });
  registerWidgetStyle('hero-text:image', {
    name: 'Space',
    identifier: 'space',
    display: 'inline-block',
    options: [
      {
        identifier: 'small',
        name: 'Small',
        cssStyle: `
                background: #cccccc;
                & > .dme-w-list > .dme-block-container{
                    padding: 5px;
                }
             `,
      },
      {
        identifier: 'big',
        name: 'Big',
        cssStyle: `
                background: #333333;
                color: white;
                & > .dme-w-list > .dme-block-container{
                    padding: 10px;
                }
             `,
      },
    ],
  });
};

export default register;
