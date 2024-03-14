import { css } from '@emotion/css';
import { DME } from 'dmeditor/index';
import { nanoid } from 'nanoid';

export interface LinkEntity {
  href: string;
  text?: string;
  externalId?: string;
  settings: {
    padding?: number;
    color?: string;
    underline?: boolean;
    align?: 'left' | 'center' | 'right';
  };
}

export const Link = (props: DME.WidgetRenderProps<LinkEntity>) => {
  const { blockNode, rootClasses } = props;
  const { href, text, settings } = blockNode.data;

  return (
    <div
      className={[rootClasses, css({ textAlign: settings.align, padding: settings.padding })].join(
        ' ',
      )}
    >
      {href ? (
        <a
          href={href}
          title={text}
          className={[
            css({
              color: settings.color,
              textDecoration: settings.underline ? 'underline' : 'none',
            }),
            'dme-w-link',
          ].join(' ')}
        >
          {text || href}
        </a>
      ) : (
        <span>please input link address </span>
      )}
    </div>
  );
};

export const LinkDefinition: DME.Widget = {
  type: 'link',
  icon: 'link',
  name: 'Link',
  category: 'widget',
  settings: [
    {
      name: 'Link',
      settingComponent: 'link-input',
      custom: true,
      property: '.href',
    },
    {
      name: 'Text',
      settingComponent: 'input',
      property: '.text',
    },
    {
      name: 'Padding',
      settingComponent: 'range',
      property: 'settings.padding',
      parameters: { min: 0, max: 40 },
    },
    {
      name: 'Align',
      settingComponent: 'align',
      property: 'settings.align',
    },
    {
      name: 'Color',
      settingComponent: 'color',
      property: 'settings.color',
    },
    {
      name: 'Text Decoration',
      settingComponent: 'button-group',
      property: 'settings.underline',
      parameters: {
        options: [
          { text: 'Underline', value: 'underline' },
          { text: 'None', value: '' },
        ],
      },
    },
  ],
  events: {
    updateData: () => {},
    createBlock: () => {
      return {
        id: nanoid(),
        type: 'link',
        data: {
          href: '',
          text: '',
          settings: { align: 'left', padding: 20 },
        },
      };
    },
  },
};
