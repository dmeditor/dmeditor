import styled from '@emotion/styled';

export const StyledList = styled.div<{ horizontal: boolean; itemGap?: number }>((props) => {
  return {
    ...(props.horizontal
      ? {
          display: 'flex',
          ...(props.itemGap && { gap: props.itemGap }),
        }
      : {
          ...(props.itemGap && { '& > div+div': { marginTop: props.itemGap } }),
        }),
  };
});
