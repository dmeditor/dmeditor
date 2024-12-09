import styled from '@emotion/styled';

export const PopupRoot = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) =>
    ({
      small: 'calc(var(--dme-main-width) * 0.5)',
      medium: 'calc(var(--dme-main-width) * 0.6)',
      large: 'calc(var(--dme-main-width) * 0.8)',
    })[props.size || 'medium']};
  .dme-viewmode-mobile & {
    width: var(--dme-main-width);
  }
  background-color: #ffffff;
  border: 1px solid #333333;
  box-shadow: 1px 2px 3px #666666;
  padding: 5px 10px;
`;

export const PopupCloseButtonContainer = styled.div`
  padding: 10px;
  text-align: center;
`;
