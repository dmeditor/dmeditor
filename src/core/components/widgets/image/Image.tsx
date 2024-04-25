import { css } from '@emotion/css';
import { dmeConfig, ImageInfo } from 'dmeditor/config';
import { DME } from 'dmeditor/index';
import { nanoid } from 'nanoid';

export interface ImageEntity {
  src: string;
  // chosen image's id if exists
  externalId?: string | number;
  thumbnail?: string;
  description?: string;
  settings: {
    align?: 'left' | 'center' | 'right';
    borderWidth?: number;
    borderColor?: string;
    width?: number;
    marginTop?: number;
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
    {
      name: 'Width',
      settingComponent: 'range',
      parameters: { min: 50, max: 800, step: 5 },
      property: 'settings.width',
    },
    {
      name: 'Margin',
      settingComponent: 'range',
      category: 'block',
      parameters: { min: 0, max: 200 },
      property: 'settings.marginTop',
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
    data: { src, settings, description },
  } = blockNode;
  const { borderWidth, borderColor, align } = settings;

  return (
    <div className={rootClasses} style={{ marginTop: settings.marginTop || 'auto' }}>
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
            src={dmeConfig.general.imagePath(src)}
            className={css({
              width: settings.width || '100%',
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
