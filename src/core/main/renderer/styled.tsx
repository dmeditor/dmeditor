import styled from '@emotion/styled';


//todo: use outline(but outline doesn't have radius) because border will make it not same as view.
export const StyledBlock = styled.div<{ active?: boolean }>`
  ${(props)=>{
    if(props.active){
      return `
      border: 2px solid var(--dme-selected-border-color);
      border-radius: 4px;
      `
    }else{
      return `
      border: 2px solid rgba(0,0,0,0);
      `
    }
  }}  
  
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