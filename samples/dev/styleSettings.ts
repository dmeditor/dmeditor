import { StyleSettingsType } from '../../src';

export const styleSettings: {
  default: { root: StyleSettingsType; list: StyleSettingsType; underList: StyleSettingsType };
  block: Array<{
    path?: string;
    level?: number;
    blockType?: string;
    rootType?: string;
    rootStyle?: string;
    config: StyleSettingsType;
  }>;
} = {
  default: {
    root: {
      settings: [
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
      ],
    },
    list: {
      settings: [
        'container-padding',
        'container-border-width',
        'container-border-color',
        'container-border-radius',
        'container-background-color',
      ],
    },
    underList: {
      settings: ['container-margin-top'],
    },
  },
  //for individual block
  block: [
    //root
    {
      rootType: '_',
      level: 1,
      config: {
        settings: [
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
        ],
      },
    },

    //hero-text
    {
      path: 'hero',
      rootType: 'hero-text',
      config: {
        settings: ['container-padding'],
      },
    },
    {
      path: 'list',
      rootType: 'hero-text',
      config: {
        settings: ['container-padding', 'container-background-color'],
        builtInSettings: ['list-item-gap'],
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
