import { StyleSettingsType } from '../../src';

const defaultRootList = [
  'content-width',
  'content-self-align',
  'container-padding',
  'container-margin-top',
  'container-border-width',
  'container-border-color',
  'container-border-radius',
  'container-background-color',
  'container-full-width',
  'container-full-width-content',
];

export const styleSettings: {
  default: { list: StyleSettingsType; underList: StyleSettingsType };
  block: Array<{
    path?: string;
    level?: number;
    blockType?: string | string[];
    rootType?: string;
    rootStyle?: string;
    config: StyleSettingsType;
  }>;
} = {
  default: {
    list: {
      settings: [
        'content-self-align',
        'container-padding',
        'container-border-width',
        'container-border-color',
        'container-border-radius',
        'container-background-color',
      ],
    },
    underList: {
      settings: [
        'content-width',
        'container-margin-top',
        'content-self-align',
        'container-padding',
        'container-border-width',
        'container-border-color',
        'container-border-radius',
        'container-background-color',
      ],
    },
  },
  //for individual block
  block: [
    //root
    {
      rootType: '_',
      level: 1,
      blockType: ['space', 'text', 'list'],
      config: {
        settings: [...defaultRootList, 'container-background-image'],
      },
    },
    {
      rootType: '_',
      level: 1,
      config: {
        settings: defaultRootList,
      },
    },

    //hero-text
    {
      path: 'hero',
      rootType: 'hero-text',
      config: {
        settings: ['container-padding', 'container-background-color'],
      },
    },
    {
      path: 'list',
      rootType: 'hero-text',
      config: {
        settings: ['container-padding', 'container-background-color'],
        builtInSettings: ['list-item-gap'],
        styles: {},
      },
    },
    {
      level: 2,
      rootType: 'hero-text',
      config: {
        settings: ['container-padding', 'container-margin-top', 'container-background-color'],
      },
    },
    {
      blockType: 'iframe',
      config: {
        settings: ['container-padding'],
      },
    },
  ],
};
