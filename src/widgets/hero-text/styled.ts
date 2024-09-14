import styled from '@emotion/styled';
import { dmeFullWidthLeft, dmeFullWidthRight } from 'dmeditor/core/config';

export const HeroTextContainer = styled.div<{ updown: boolean }>`
  ${(props) => {
    if (!props.updown) {
      return `display: grid;
      grid-template-columns: 50% 50%;
      & > .dme-w-list{
        display: flex;

        & > div{
        flex-grow: 1;
        }
      }

      `;
    }
  }}
`;

export const HeroImageDiv = styled.div<{ heroPostion?: 'left' | 'right'; fullWidth?: boolean }>(
  (props) =>
    props.fullWidth ? (props.heroPostion === 'right' ? dmeFullWidthRight : dmeFullWidthLeft) : {},
);
