import { css } from '@emotion/css';
import { ImageInfo } from 'dmeditor/config';
import { DME } from 'dmeditor/index';
import { nanoid } from 'nanoid';

export interface ImageEntity {
  value: ImageInfo;
  description?: string;
  settings: {
    align?: 'left' | 'center' | 'right';
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
      name: 'Source',
      settingComponent: 'image-source',
      custom: true,
    },
    {
      name: 'Description',
      settingComponent: 'input',
      property: '.description',
    },
    {
      name: 'Align',
      settingComponent: 'align',
      property: 'settings.align',
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
  ],
  events: {
    updateData: () => {},
    createBlock: () => {
      return {
        id: nanoid(),
        type: 'image',
        data: {
          value: { src: '' },
          description: '',
          settings: { align: 'center', borderWidth: 0, borderColor: '' },
        },
      };
    },
  },
};

export const Image = (props: DME.WidgetRenderProps<ImageEntity>) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value, settings, description },
  } = blockNode;
  const { borderWidth, borderColor, align } = settings;
  const { src } = value;

  return (
    <div className={rootClasses}>
      {!src && (
        <div
          className={css`
            padding: 20px 5px;
          `}
        >
          Please choose an image.
        </div>
      )}
      {src && (
        <div
          className={(styleClasses['image'] || '') + ' dme-w-image ' + css({ textAlign: align })}
        >
          <img
            src={src}
            className={css({
              width: '100%',
              display: 'inline-block',
              ...(borderWidth ? { borderWidth: borderWidth } : {}),
              ...(borderColor ? { borderColor: borderColor } : {}),
            })}
          />
        </div>
      )}
      {description && (
        <div className={(styleClasses['description'] || '') + ' dme-w-description'}>
          {description}
        </div>
      )}
    </div>
  );
};
