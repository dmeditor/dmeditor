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

// export const AddingTool = styled.div<{ position?: string; horizontal?: boolean }>`
//   // above, under(default), left, right
//   position: absolute;
//   cursor: pointer;
//
//   ${(props) =>
//     props.horizontal
//       ? `
//         top:clamp(0px, 0px, 40%);
//         height: 20%;
//     `
//       : `
//         text-align: center;
//         left: 40%;
//         width: auto;
//     `}
//
//   ${(props) => {
//     if (props.position === 'before') {
//       if (props.horizontal) {
//         return `left: -36px;`;
//       }
//       return `top: -36px;`;
//     }
//     if (props.position === 'after') {
//       if (props.horizontal) {
//         return `right: -36px;`;
//       }
//       return `bottom: -30px;`;
//     }
//     return '';
//   }}
// `;
// export const AddingTool = styled.div<{ position?: 'before' | 'after'; horizontal?: boolean }>`
//   position: absolute;

//   ${(props) =>
//     props.horizontal
//       ? `
//         top:clamp(0px, 0px, 40%);
//         bottom: 0;
//         width: 20%;
//     `
//       : `
//         left: 0;
//         right: 0;
//         height: 20%;
//     `}

//   ${(props) => {
//     const offset = '36px';
//     if (props.position === 'before') {
//       return props.horizontal ? `left: -${offset};` : `top: -${offset};`;
//     }
//     if (props.position === 'after') {
//       return props.horizontal ? `right: -${offset};` : `bottom: -${offset};`;
//     }
//     return '';
//   }}

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   pointer-events: cursor;
// `;

export const StyledButtonContainer = styled.span`
  background-color: #ffffff;
  display: inline-block;
  // width: auto;
  border: 1px solid #ffd9d9;
  border-radius: 50%;
  z-index: 50;
  position: relative;
`;

export const BlockListStyle = styled.div``;
type AddingToolProps = {
  position: 'before' | 'after';
  horizontal: boolean;
};

export const DMEditorViewStyle = styled.div<{ projectStyle?: string; themeStyle?: string }>(
  ({ projectStyle }) => projectStyle,
  ({ themeStyle }) => themeStyle,
);

export const AddingTool = styled.div<AddingToolProps>`
  position: absolute;
  z-index: 1000;

  ${({ position, horizontal }) => {
    if (horizontal) {
      // TODO:
      return position === 'before'
        ? 'left: -35px; top: 50%; transform: translateY(-50%);'
        : 'right: -35px; top: 50%; transform: translateY(-50%);';
    } else {
      return position === 'before'
        ? 'top: -35px; left: 50%; transform: translateX(-50%);'
        : 'bottom: -35px; left: 50%; transform: translateX(-50%);';
    }
  }}

  &::before {
    content: '';
    position: absolute;
    background: transparent;
    border-radius: 4px;

    ${({ horizontal }) =>
      horizontal ? 'height: 100%; width: 10px;' : 'width: 100%; height: 10px;'}
  }
`;
