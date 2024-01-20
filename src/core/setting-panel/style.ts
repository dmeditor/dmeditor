import styled from '@emotion/styled';

export const SettingHeader = styled.div`
  font-weight: bold;
`;

export const SettingDescription = styled.div`
   color: #999999;
   padding-bottom: 10px;
`;


export const PageTitle = styled.div`
   padding: 5px;
   font-size: 18px;
   &:hover{
    outline: 1px dashed #333333; 
  }
`;

export const Space = styled.div`
  height: 10px
`

export const PathItem = styled.span<{ canClick?: boolean, selected?:boolean }>`
  font-size: 90%;
  cursor: default;
  display: inline-block;
  vertical-align: bottom;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.canClick ? '#0c0c0c' : '#666666')};

  ${(props) =>
    props.canClick
      ? `
    &:hover{
        color: var(--dme-hover-font-color);
    }
    `
      : ''};
`;

export const RightElement = styled.div`
    float: right;
`
