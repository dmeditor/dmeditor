import styled from '@emotion/styled';


//todo: use outline(but outline doesn't have radius) because border will make it not same as view.
export const StyledBlock = styled.div<{ active?: boolean }>`
  &:hover{
    outline: 2px dotted var(--dme-selected-border-color);
    border-radius: 4px;
    z-index: 50;
  }
  ${(props)=>{
    if(props.active){
      return `
      outline: 2px solid var(--dme-selected-border-color) !important;
      border-radius: 4px;
      z-index: 50;
      `
    }else{
      return `
      `
    }
  }}  
  
  position: relative;
`;

export const AddingMessage = styled.div`
  color: #666666;
  padding: 20px 40px;
  text-align: center;
  background: #fff3f3;
  border: 1px solid #fcd1d1;
  margin: 10px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
`;



export const AddingTool = styled.div<{ position?: string }>` //above, under(default), left, right
    text-align: center;
    position: absolute;
    left: 40%;
    width: 20%;
    
    ${(props)=>{
      if(props.position === 'before'){
        return `top: -30px;`;
      }
      if(props.position === 'after'){
        return `bottom: -30px;`;
      }
      return ''
    }}
`;


export const BlockListStyle = styled.div`
`