import styled from '@emotion/styled';

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
