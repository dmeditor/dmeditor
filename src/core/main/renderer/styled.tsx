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

export const StyledAddWidgetButton = styled.div`
  padding: 40px;
`

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



export const AddingTool = styled.div<{ position?: string, horizontal?:boolean }>` //above, under(default), left, right
    position: absolute;
    ${(props)=>props.horizontal?`
        top:clamp(0px, 0px, 40%);
        height: 20%;
    `:`
        text-align: center;
        left: 40%;
        width: 20%;
    `}
    
    ${(props)=>{
      if(props.position === 'before'){
        if(props.horizontal){
          return `left: -30px;`;          
        }
        return `top: -30px;`;
      }
      if(props.position === 'after'){
        if(props.horizontal){
          return `right: -30px;`;          
        }
        return `bottom: -30px;`;
      }
      return ''
    }}
`;


export const BlockListStyle = styled.div`
`