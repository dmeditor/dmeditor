import styled from '@emotion/styled';

export const StyledList = styled.div<{ horizontal: boolean; align?: string }>`
  ${(props) => (props.horizontal ? 'display:flex;align-items:center;' : 'padding: 10px;')}
  ${(props) => (props.align ? 'justify-content:' + props.align : '')}
`;
