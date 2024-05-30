import styled from '@emotion/styled';
import { DMEData } from 'dmeditor/core/types';
import { isObject } from 'lodash';

const getGeneralStyle = (settings: DMEData.GeneralSettingType) => {
  const elementStyle: any = {};
  const containerStyle: any = {};
  if (settings.width) {
    elementStyle['width'] = settings.width;
  } else {
    if (settings.align) {
      elementStyle['width'] = 'fit-content';
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
  if (settings.marginTop) {
    containerStyle['marginTop'] = settings.marginTop;
  }
  if (settings.background && typeof settings.background === 'string') {
    containerStyle['backgroundColor'] = settings.background;
  }
  if (settings.background && isObject(settings.background)) {
    containerStyle['backgroundColor'] = settings.background?.color;
  }

  if (settings.backgroundFullWidth) {
    containerStyle['marginLeft'] = 'calc((var(--dme-main-width) - var(--dme-container-width)) / 2)';
    containerStyle['paddingLeft'] =
      'calc((var(--dme-container-width) - var(--dme-main-width)) / 2)';
    containerStyle['marginRight'] =
      'calc((var(--dme-main-width) - var(--dme-container-width)) / 2)';
    containerStyle['paddingRight'] =
      'calc((var(--dme-container-width) - var(--dme-main-width)) / 2)';
  }
  if (settings.padding) {
    containerStyle['padding'] = settings.padding;
  }
  return {
    ...(Object.keys(containerStyle).length > 0 && { '&': containerStyle }),
    ...(Object.keys(elementStyle).length > 0 && { '& > *': elementStyle }),
  };
};

export const BlockWrapper = styled.div<{
  generalSettings?: DMEData.GeneralSettingType;
  active?: boolean;
}>`
  ${(props) => (props.generalSettings ? getGeneralStyle(props.generalSettings) : {})}

  ${(props) => {
    if (props.active) {
      return `
      outline: 2px solid var(--dmee-selected-border-color) !important;
      border-radius: 4px;
      z-index: var(--dmee-zindex);
      `;
    } else {
      return `
      `;
    }
  }}

  &:hover {
    outline: 2px dotted var(--dmee-selected-border-color);
    border-radius: 4px;
    z-index: calc(var(--dmee-zindex) + 50);
  }
`;
