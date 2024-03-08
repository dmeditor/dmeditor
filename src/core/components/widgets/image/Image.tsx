import { DME } from 'dmeditor/index';
import { nanoid } from 'nanoid';

export interface ImageEntity {
  src: string;
  settings: {
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
          settings: { description: '', borderWidth: 0, borderColor: '' },
        },
      };
    },
  },
};

const PlaceholderImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png';

export const Image = (props: DME.WidgetRenderProps<ImageEntity>) => {
  const { blockNode, rootClasses } = props;
  const {
    data: { src, settings },
  } = blockNode;
  const { description, borderWidth, borderColor } = settings;

  return (
    <img
      src={src || PlaceholderImage}
      alt={description || ''}
      className={rootClasses}
      style={{ width: '100%', height: 'auto', borderWidth: borderWidth, borderColor: borderColor }}
    />
  );
};
