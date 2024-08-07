import styled from '@emotion/styled';

export const StyledAddWidgetButton = styled.div`
  padding: 40px;
`;

export const AddingMessage = styled.div`
  color: #666666;
  padding: 10px 40px;
  text-align: center;
  background: #fff3f3;
  border: 1px solid #fcd1d1;
  margin: 10px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
`;

export const AddingTool = styled.div<{ position?: string; horizontal?: boolean }>`
  //above, under(default), left, right
  position: absolute;
  ${(props) =>
    props.horizontal
      ? `
        top:clamp(0px, 0px, 40%);
        height: 20%;
    `
      : `
        text-align: center;
        left: 40%;
        width: 20%;
    `}

  ${(props) => {
    if (props.position === 'before') {
      if (props.horizontal) {
        return `left: -36px;`;
      }
      return `top: -36px;`;
    }
    if (props.position === 'after') {
      if (props.horizontal) {
        return `right: -36px;`;
      }
      return `bottom: -36px;`;
    }
    return '';
  }}
`;

export const StyledButtonContainer = styled.span`
  background-color: #ffffff;
  display: inline-block;
  border: 1px solid #ffd9d9;
  border-radius: 40px;
  z-index: 50;
`;

export const BlockListStyle = styled.div``;
