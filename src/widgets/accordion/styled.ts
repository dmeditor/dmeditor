import styled from '@emotion/styled';

export const Accordion = {
  Container: styled.div<{ open?: boolean }>``,
  Item: styled.div<{ open?: boolean }>``,
  Summary: styled.div<{ open?: boolean; iconPosition?: 'left' | 'right' }>`
    cursor: pointer;
    display: flex;
    align-items: center;
    ${(props) => (props.iconPosition === 'left' ? { flexDirection: 'row-reverse' } : {})}
    transition: all 0.3s ease-out;
  `,
  Title: styled.div`
    flex: 1;
  `,
  Icon: styled.div<{ open?: boolean }>`
    @keyframes rotate {
      100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    @keyframes rotateBack {
      0% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    ${(props) =>
      props.open
        ? { animation: 'rotate 0.2s forwards 1' }
        : { animation: 'rotateBack 0.2s forwards 1' }};
  `,
  Body: styled.div``,
};
