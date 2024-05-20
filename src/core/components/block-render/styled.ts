import styled from '@emotion/styled';
import { DMEData } from 'dmeditor/core/types';

const getGeneralStyle = (settings: DMEData.GeneralSettingType) => {
  const elementStyle: any = {};
  const containerStyle: any = {};
  if (settings.width) {
    elementStyle['width'] = settings.width;
  } else {
    elementStyle['width'] = 'fit-content';
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
  if (settings.padding) {
    containerStyle['padding'] = settings.padding;
  }
  if (settings.background && settings.background?.color) {
    containerStyle['backgroundColor'] = settings.background?.color;
  }
  return {
    ...(Object.keys(containerStyle).length > 0 && { '&': containerStyle }),
    ...(Object.keys(elementStyle).length > 0 && { '& > *': elementStyle }),
  };
};

export const BlockWrapper = styled.div<{ generalSettings?: DMEData.GeneralSettingType }>`
  ${(props) => (props.generalSettings ? getGeneralStyle(props.generalSettings) : {})}

  &:hover {
    outline: 2px dotted var(--dmee-selected-border-color);
    border-radius: 4px;
    z-index: calc(var(--dmee-zindex) + 50);
  }
`;
