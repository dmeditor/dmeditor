import { css } from '@emotion/css';
import { DME } from 'dmeditor/index';
import { nanoid } from 'nanoid';

export interface ImageEntity {
  src: string;
  settings: {
    align?: 'left' | 'center' | 'right';
    description?: string;
    borderWidth?: number;
    borderColor?: string;
  };
}

export const ImageDefinition: DME.Widget = {
  type: 'image',
  icon: 'image',
  name: 'Image',
  category: 'widget',
  settings: [
    {
      name: 'Description',
      settingComponent: 'link',
      property: 'settings.description',
    },
    {
      name: 'Border Width',
      settingComponent: 'range',
      property: 'settings.borderWidth',
      parameters: { min: 0, max: 40 },
    },
    {
      name: 'Align',
      settingComponent: 'align',
      property: 'settings.align',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      property: 'settings.borderColor',
    },
    {
      name: 'Source',
      settingComponent: 'image-source',
      custom: true,
      property: '.src',
    },
  ],
  events: {
    updateData: () => {},
    createBlock: () => {
      return {
        id: nanoid(),
        type: 'image',
        data: {
          src: '',
          settings: { description: '', align: 'center', borderWidth: 0, borderColor: '' },
        },
      };
    },
  },
};

const PlaceholderImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png';

export const Image = (props: DME.WidgetRenderProps<ImageEntity>) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { src, settings },
  } = blockNode;
  const { description, borderWidth, borderColor, align } = settings;

  return (
    <div className={rootClasses}>
      <div className={css({ textAlign: align })}>
        <img
          src={src || PlaceholderImage}
          className={css({
            width: '100%',
            display: 'inline-block',
            ...(borderWidth ? { borderWidth: borderWidth } : {}),
            ...(borderColor ? { borderColor: borderColor } : {}),
          })}
        />
      </div>
      {description && (
        <div className={(styleClasses['description'] || '') + ' dme-w-description'}>
          {description}
        </div>
      )}
    </div>
  );
};
