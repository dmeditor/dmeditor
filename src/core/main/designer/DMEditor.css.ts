import { css } from '@emotion/css';

export const setMainWidthCssVariable = (dmeMainWidth: any) => css`
  --dme-main-width: ${dmeMainWidth};
  --dme-container-width: 100vw;
  &.dmeditor-view-mobile,
  &.dmeditor-view-tablet {
    --dme-container-width: 100vw;
  }
`;
