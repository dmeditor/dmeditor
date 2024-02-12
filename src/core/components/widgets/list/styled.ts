import styled from "@emotion/styled";

export const StyledList = styled.div<{ horizontal: boolean }>`
    ${(props) =>props.horizontal?'display:flex':''
    } 
`;