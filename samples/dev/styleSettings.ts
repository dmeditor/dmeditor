import { StyleSettingsType } from '../../src';

export const styleSettings: {
  default: { root: StyleSettingsType; list: StyleSettingsType; underList: StyleSettingsType };
  block: Record<
    string,
    Array<{
      path?: string;
      level?: number;
      blockType?: string;
      rootStyle?: string;
      config: StyleSettingsType;
    }>
  >;
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
  block: {
    'hero-text': [
      {
        path: 'hero',
        config: {
          settings: ['container-padding'],
        },
      },
      {
        path: 'list',
        config: {
          settings: [
            'container-padding',
            'container-border-width',
            'container-border-color',
            'container-border-radius',
            'container-background-color',
          ],
        },
      },
      {
        path: 'list/heading',
        config: {
          settings: [
            'container-padding',
            'container-border-width',
            'container-border-color',
            'container-border-radius',
            'container-background-color',
          ],
        },
      },
      {
        level: 2,
        config: {
          settings: [
            'container-padding',
            'container-border-width',
            'container-border-color',
            'container-border-radius',
            'container-background-color',
          ],
          styles: { margin: ['big-margin'] },
        },
      },
    ],
  },
};
