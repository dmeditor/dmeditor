import styled from '@emotion/styled';
import type { TransitionStatus } from 'react-transition-group';

export const StyledCarouselItem = styled.div(
  (props: { status: TransitionStatus; isActive: boolean; animation: 'default' | 'slide' }) => {
    const { status, isActive, animation } = props;
    switch (animation) {
      case 'slide':
        return {
          'backface-visibility': 'hidden',
          // display: isActive ? 'block' : 'none',
          display: 'none',
          float: 'left',
          'margin-right': '-100%',
          position: 'relative',
          transition: 'transform .6s ease-in-out',
          width: '100%',
        };
      default:
        const transitionStyles: Record<TransitionStatus, { opacity: number }> = {
          entering: { opacity: 1 },
          entered: { opacity: 1 },
          exiting: { opacity: 0 },
          exited: { opacity: 0 },
          unmounted: { opacity: 0 },
        };
        return {
          'backface-visibility': 'hidden',
          float: 'left',
          'margin-right': '-100%',
          position: 'relative',
          transition: `opacity 300ms ease-in-out`,
          opacity: transitionStyles[status].opacity,
          width: '100%',
        };
    }
  },
);

export const StyledCarouselImage = styled.img({
  width: '100%',
});

export const StyledCarouselCaption = styled.div({
  top: '1.25rem',
  color: '#fff',
  left: '15%',
  'padding-bottom': '1.25rem',
  'padding-top': '1.25rem',
  position: 'absolute',
  right: '15%',
  'text-align': 'center',
});

export const StyledCarsouelIndicator = styled.ul({
  bottom: 0,
  display: 'flex',
  'justify-content': 'center',
  left: 0,
  'margin-bottom': '1rem',
  'margin-left': '15%',
  'margin-right': '15%',
  padding: 0,
  position: 'absolute',
  right: 0,
  'z-index': 2,
});

export const StyledCarouselIndicatorItem = styled.li((props: { active: boolean }) => ({
  position: 'relative',
  display: 'inline-block',
  flex: '0 1 auto',
  boxSizing: 'content-box',
  width: props.active ? '24px' : '16px',
  height: '3px',
  marginInline: '4px',
  padding: 0,
  textAlign: 'center',
  textIndent: '-999px',
  verticalAlign: 'top',
  transform: 'all 0.3s',
  // background: props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)',
  // border: '1px solid #fff',
  // cursor: 'pointer',
  // height: '10px',
  // 'list-style': 'none',
  // margin: '0 4px',
  // padding: 0,
  // width: '10px',
}));

export const StyledCarouselIndicatorButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 3px;
  padding: 0;
  color: transparent;
  font-size: 0;
  background: #ffffff;
  border: 0;
  border-radius: 3px;
  outline: none;
  opacity: ${(props: { active: boolean }) => (props.active ? 1 : 0.3)};
  transition: all 0.3s;
  cursor: pointer;
  &:after {
    position: absolute;
    inset: -4px;
    content: '';
  }
`;

export const StyledCarouselContainer = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;
