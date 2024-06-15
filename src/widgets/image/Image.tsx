import { css } from '@emotion/css';

import { dmeConfig, generalSettings } from '../..';
import type { DME, DMEData } from '../..';

export interface ImageEntity {
  src: string;
  // chosen image's id if exists
  externalId?: string | number;
  thumbnail?: string;
  description?: string;
  settings: DMEData.GeneralSettingType & {
    borderWidth?: number;
    borderColor?: string;
    general?: DMEData.GeneralSettingType;
  };
}

export const ImageDefinition: DME.Widget = {
  type: 'image',
  icon: 'image',
  name: 'Image',
  category: 'basic',
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
      name: 'Border Width',
      settingComponent: 'range',
      property: 'settings.borderWidth',
      parameters: { min: 0, max: 40 },
      category: 'block',
      styleTags: ['core'],
      group: 'style_border',
    },
    {
      name: 'Border Color',
      settingComponent: 'color',
      property: 'settings.borderColor',
      category: 'block',
      styleTags: ['core'],
      group: 'style_border',
    },
    ...generalSettings,
  ],
  events: {
    updateData: () => {},
    createBlock: (): DMEData.CreatedBlock<ImageEntity> => {
      return {
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
    <div>
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
              ...(borderWidth ? { borderWidth: borderWidth, borderStyle: 'solid' } : {}),
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

export const Preview = (props: { blockData: DMEData.Block<ImageEntity> }) => {
  return (
    <img
      src={dmeConfig.general.imagePath(props.blockData.data.src, 'thumbnail')}
      className={css`
        height: 20px;
      `}
    />
  );
};
