import styled from "@emotion/styled";

export const InlineBlockStyle = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
`;


export const InlineBlockItemStyle = styled.div<{selected?:boolean}>`
    padding: 10px;
    border: 1px solid #f0f0f0;
    background-color: #efefef;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;

    &:hover{
        border-color: #dddddd;
    }
    ${(props) =>
    props.selected
      ? `
        background-color: #333333;
        color: #ffffff;
    `
      : ''};
`;