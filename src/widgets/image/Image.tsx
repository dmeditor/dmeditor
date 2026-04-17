import { css } from '@emotion/css';
import { getCommonSettings } from 'dmeditor/core/setting-panel/property-setting';

import { dmeConfig, generalSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';

export interface ImageEntity {
  src: string;
  // chosen image's id if exists
  externalId?: string | number;
  thumbnail?: string;
  description?: string;
  link?: string;
  settings: {
    linkNewTab?: boolean;
    borderWidth?: number | string;
    borderColor?: string;
    borderRadius?: number;
    general?: DMEData.GeneralSettingType;
  };
}

export const ImageDefinition: DME.Widget = {
  type: 'image',
  icon: 'image',
  get name() {
    return i18n('Image', 'widget');
  },
  category: 'basic',
  settings: [
    {
      get name() { return i18n('Source', 'property-label'); },
      settingComponent: 'image-source',
      custom: true,
    },
    {
      get name() { return i18n('Description', 'property-label'); },
      settingComponent: 'input',
      property: '.description',
    },
    {
      get name() { return i18n('Link', 'property-label'); },
      settingComponent: 'link',
      property: '.link',
    },
    {
      get name() { return i18n('Open new tab', 'property-label'); },
      settingComponent: 'checkbox',
      property: 'settings.linkNewTab',
    },
    {
      get name() { return i18n('Border width', 'property-label'); },
      settingComponent: 'range',
      property: 'settings.borderWidth',
      parameters: { min: 0, max: 40 },
      identifier: 'image-border-width',
      category: 'style',
      styleTags: ['core'],
      group: 'style_border',
    },
    {
      get name() { return i18n('Border color', 'property-label'); },
      identifier: 'image-border-color',
      settingComponent: 'color',
      property: 'settings.borderColor',
      parameters: {
        colorGroup: 'border',
      },
      category: 'style',
      styleTags: ['core'],
      group: 'style_border',
    },
    {
      get name() { return i18n('Border radius', 'property-label'); },
      identifier: 'image-border-radius',
      settingComponent: 'distance',
      property: 'settings.borderRadius',
      parameters: { min: 0, max: 50 },
      category: 'style',
      styleTags: ['core'],
      group: 'style_border',
    },
  ],
  events: {
    updateData: () => {},
    createBlock: (): DMEData.CreatedBlock<ImageEntity> => {
      return {
        type: 'image',
        data: {
          src: '',
          description: '',
          settings: { general: { align: 'center' }, borderWidth: 0, borderColor: '' },
        },
      };
    },
  },
};

export const Image = (props: DME.WidgetRenderProps<ImageEntity>) => {
  const { blockNode, styleClasses } = props;
  const {
    data: { src, settings, description, link },
  } = blockNode;
  const { borderWidth, borderColor, linkNewTab, borderRadius } = settings;

  const renderImage = () => {
    return (
      <>
        {src && (
          <div className={(styleClasses['image'] || '') + ' dme-w-image '}>
            <img
              src={dmeConfig.general.imagePath(src)}
              className={css({
                maxWidth: '100%',
                ...(settings.general?.width && { width: '100%' }),
                ...(borderWidth
                  ? {
                      borderWidth: borderWidth,
                      borderStyle: 'solid',
                      boxSizing: 'border-box',
                    }
                  : {}),
                ...(borderRadius ? { borderRadius: borderRadius } : {}),
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
      </>
    );
  };

  return (
    <div>
      {props.mode === 'edit' && !src && (
        <div
          className={css`
            padding: 20px 5px;
          `}
        >
          Please choose an image.
        </div>
      )}
      {link ? (
        <a href={link} {...(linkNewTab ? { target: '_blank' } : {})}>
          {renderImage()}
        </a>
      ) : (
        renderImage()
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
