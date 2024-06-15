import { useMemo } from 'react';
import { css } from '@emotion/css';

import { BlockListRender, BlockRender, useDevice } from '../..';
import type { DME } from '../..';
import { dmeFullWidthLeft, dmeFullWidthRight } from '../../core/config';
import { getAllowedTypes } from '../../core/utils/register';
import { EntityHeroText } from './entity';
// import { ImageContainer } from './style';
import { HeroTextContainer } from './styled';

const HeroText = (props: DME.WidgetRenderProps<EntityHeroText>) => {
  const {
    blockNode: {
      children,
      data: { heroPosition, heroFullWidth },
    },
    path,
    blockNode,
    mode,
    styleClasses,
  } = props;

  if (children?.length !== 2) {
    console.warn('Image text should be 2 children. Ignored.');
    return <></>;
  }

  const getClass = (type: string) => {
    if (!styleClasses || !styleClasses[type]) {
      return '';
    }
    return styleClasses[type].join(' ');
  };

  const device = useDevice();

  const fullWidthClass = useMemo(() => {
    let result = '';
    if (heroFullWidth) {
      if (heroPosition === 'right') {
        result = css(dmeFullWidthRight);
      } else {
        result = css(dmeFullWidthLeft);
      }
    }
    return result;
  }, [heroPosition, heroFullWidth]);

  const renderImage = () => (
    <div className={getClass('hero') + ' dme-w-hero ' + fullWidthClass}>
      <BlockRender mode={mode} data={children[0]} path={[...path, 0]} />
    </div>
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
