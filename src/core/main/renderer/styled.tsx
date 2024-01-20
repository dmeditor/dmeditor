import styled from '@emotion/styled'

export const StyledBlock = styled.div<{active?: boolean}>`
    outline: ${props=>props.active?'1px solid var(--dme-selected-border-color)': 'none'};
`