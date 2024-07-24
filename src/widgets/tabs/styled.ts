import styled from '@emotion/styled';

export const StyledBaseTabs = styled.div((props: { isActive: boolean }) => {
  const { isActive } = props;

  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    border: isActive ? '1px solid #1e6fff' : '1px solid #e0e0e0',
  };
});
