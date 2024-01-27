import styled from '@emotion/styled';

export const StyledBlock = styled.div<{ active?: boolean }>`
  border: ${(props) => (props.active ? '2px solid var(--dme-selected-border-color)' : '2px solid rgba(0,0,0,0)')};
  border-radius: ${(props) => (props.active ? '4px' : 'none')};
  position: relative;
`;

export const AddingMessage = styled.div`
  color: #666666;
  padding: 10;
  background: #fcfcfc;
  border: 1px solid #eeeeee;
  margin: 0px 30px;
  border-radius: 10px;
`;



export const AddingTool = styled.div<{ type?: string }>` //above, under(default), left, right
    text-align: center;
    position: absolute;
    width: 100%;
    ${(props)=>{
      if(props.type === 'above'){
        return 'margin-top: -34px;';
      } 
      return ''
    }}
`;


export const BlockListStyle = styled.div`
`