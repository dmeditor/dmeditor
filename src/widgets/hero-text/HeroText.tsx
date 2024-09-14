import { useMemo } from 'react';
import { css } from '@emotion/css';

import { BlockRender, useDevice } from '../..';
import type { DME } from '../..';
import { dmeFullWidthLeft, dmeFullWidthRight } from '../../core/config';
import { EntityHeroText } from './entity';
import { HeroImageDiv, HeroTextContainer } from './styled';

const HeroText: React.FC<DME.WidgetRenderProps<EntityHeroText>> = (props) => {
  const {
    blockNode: {
      children,
      data: { heroPosition, heroFullWidth },
    },
    path,
    mode,
    styleClasses,
  } = props;

  if (children?.length !== 2) {
    console.warn('Image text should be 2 children. Ignored.');
    return null;
  }

  const getClass = (type: string) => {
    if (!styleClasses || !styleClasses[type]) {
      return '';
    }
    return styleClasses[type].join(' ');
  };

  const device = useDevice();

  const renderImage = () => (
    <HeroImageDiv
      heroPostion={heroPosition}
      fullWidth={heroFullWidth}
      className={getClass('hero') + ' dme-w-hero'}
    >
      <BlockRender mode={mode} data={children[0]} path={[...path, 0]} />
    </HeroImageDiv>
  );
  const renderList = () => (
    <div className={getClass('list') + ' dme-w-list'}>
      <BlockRender data={children[1]} mode={mode} path={[...path, 1]} />
    </div>
  );

  const imageLeft = () => {
    return heroPosition !== 'right' || device === 'mobile';
  };

  return (
    <HeroTextContainer updown={device === 'mobile'}>
      {imageLeft() && (
        <>
          {renderImage()}
          {renderList()}
        </>
      )}
      {!imageLeft() && (
        <>
          {renderList()}
          {renderImage()}
        </>
      )}
    </HeroTextContainer>
  );
};

export { HeroText };
