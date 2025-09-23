import styled from '@emotion/styled';
import { dmeConfig } from 'dmeditor/core/config';
import { DMEData } from 'dmeditor/core/types';
import { isObject } from 'lodash';

const getMobileSettings = (settings: DMEData.GeneralSettingType) => {
  const result = {} as DMEData.GeneralSettingType;
  for (const setting in settings) {
    if (setting.includes('Mobile')) {
      continue;
    }
    const settingMobile = setting + 'Mobile';
    const settingValue = settings[settingMobile];
    if (settingValue !== undefined) {
      result[setting] = settingValue;
    } else {
      result[setting] = settings[setting];
    }
  }
  return result;
};

const getGeneralStyle = (settings: DMEData.GeneralSettingType, device: string) => {
  if (device === 'mobile') {
    settings = getMobileSettings(settings);
  }
  const elementStyle: any = {};
  const containerStyle: any = {};
  //todo: can be deleted since it's covered by mobile settings
  if (settings.width) {
    if (device === 'mobile' && typeof settings.width === 'number') {
    } else {
      elementStyle['width'] = settings.width;
    }
  } else {
    if (settings.align) {
      if (device === 'mobile') {
        elementStyle['maxWidth'] = '100%';
      } else {
        elementStyle['width'] = 'fit-content';
      }
    }
  }

  if (settings.blockBackground && typeof settings.blockBackground === 'string') {
    elementStyle['backgroundColor'] = settings.blockBackground;
  }
  if (settings.align) {
    switch (settings.align) {
      case 'left':
        elementStyle['marginLeft'] = '0px';
        elementStyle['marginRight'] = 'auto';
        break;
      case 'center':
        elementStyle['margin'] = 'auto';
        break;
      case 'right':
        elementStyle['marginLeft'] = 'auto';
        elementStyle['marginRight'] = '0px';
    }
  }
  if (settings.padding) {
    if (Array.isArray(settings.padding)) {
      const position = ['Top', 'Right', 'Bottom', 'Left'];
      position.forEach((pos, index) => {
        containerStyle[`padding${pos}`] = (settings.padding! as number[])[index];
      });
    } else {
      containerStyle['padding'] = settings.padding;
    }
  }
  if (settings.marginTop) {
    containerStyle['marginTop'] = settings.marginTop;
  }
  if (settings.background && typeof settings.background === 'string') {
    containerStyle['backgroundColor'] = settings.background;
  }
  if (settings.background && isObject(settings.background)) {
    containerStyle['backgroundColor'] = settings.background?.color;
  }

  if (settings.borderWidth) {
    containerStyle['borderWidth'] = settings.borderWidth;
    containerStyle['borderColor'] = settings.borderColor;
    containerStyle['borderStyle'] = 'solid';
  }

  if (settings.backgroundImage && settings.backgroundImage.image) {
    containerStyle['backgroundImage'] =
      'url(' + dmeConfig.general.imagePath(settings.backgroundImage.image) + ')';
    if (device !== 'mobile') {
      containerStyle['backgroundSize'] = '100% auto';
    } else {
      containerStyle['backgroundSize'] = 'cover';
    }

    containerStyle['backgroundRepeat'] = 'no-repeat';

    if (settings.backgroundImage.fixed) {
      containerStyle['backgroundAttachment'] = 'fixed';
    } else {
      containerStyle['backgroundPosition'] = 'center center';
    }
  }

  if (settings.borderRadius) {
    containerStyle['borderRadius'] = settings.borderRadius;
  }

  if (settings.fullWidth) {
    containerStyle['marginLeft'] = 'calc((var(--dme-main-width) - var(--dme-container-width)) / 2)';
    containerStyle['marginRight'] =
      'calc((var(--dme-main-width) - var(--dme-container-width)) / 2)';
    if (!settings.fullWidthContent) {
      containerStyle['paddingLeft'] =
        'calc((var(--dme-container-width) - var(--dme-main-width)) / 2)';
      containerStyle['paddingRight'] =
        'calc((var(--dme-container-width) - var(--dme-main-width)) / 2)';
    }
  }
  return {
    ...(Object.keys(containerStyle).length > 0 && { '&': containerStyle }),
    ...(Object.keys(elementStyle).length > 0 && { '& > *': elementStyle }),
  };
};

export const BlockWrapper = styled.div<{
  generalSettings?: DMEData.GeneralSettingType;
  active?: boolean;
  editMode?: boolean;
  widgetStyles?: string[];
  device: string;
}>`
  ${(props) => (props.generalSettings ? getGeneralStyle(props.generalSettings, props.device) : {})}
  ${({ editMode, active }) => {
    if (editMode && active) {
      return `
        outline: 2px solid var(--dmee-selected-border-color) !important;
        // border-radius: 4px;
        outline-offset: -1px;
        z-index: var(--dmee-zindex);
      `;
    } else {
      return '';
    }
  }}

  ${({ widgetStyles }) => widgetStyles?.join()}

  &:hover {
    ${(props) =>
      props.editMode &&
      `
        outline: 2px dotted var(--dmee-selected-border-color);
        // border-radius: 4px;
        outline-offset: -1px;
        z-index: calc(var(--dmee-zindex) + 50);
    `}
  }
`;

export const BlockMask = styled.div<{ height: number }>`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  height: ${(props) => props.height}px;
  background: rgba(255, 255, 255, 0.01);
`;
