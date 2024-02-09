import styled from "@emotion/styled";

export const StyledGrid = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: ${(props) =>{
        let value = '';
        for(let i=0; i<props.columns;i++){
            value += ' '+100/props.columns+'%';
        }
        return value;
    }} 
`;