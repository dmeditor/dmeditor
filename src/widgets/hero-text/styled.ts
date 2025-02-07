import styled from '@emotion/styled';
import { dmeFullWidthLeft, dmeFullWidthRight } from 'dmeditor/core/config';

export const HeroTextContainer = styled.div<{ updown: boolean; gap?: number }>`
  ${(props) => {
    if (!props.updown) {
      return `display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${props.gap || 0}px;
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

export const HeroImageDiv = styled.div<{ heroPostion?: 'start' | 'end'; fullWidth?: boolean }>(
  (props) =>
    props.fullWidth ? (props.heroPostion === 'end' ? dmeFullWidthRight : dmeFullWidthLeft) : {},
);
