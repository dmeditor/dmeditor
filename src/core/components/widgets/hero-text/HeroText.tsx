import { useMemo } from 'react';
import { css } from '@emotion/css';
import { dmeFullWidthLeft, dmeFullWidthRight } from 'dmeditor/config';
import { BlockListRender, BlockRender } from 'dmeditor/main/renderer';
import { DME } from 'dmeditor/types';

import { getAllowedTypes, getWidget, getWidgetWithVariant } from '..';
import { EntityHeroText } from './entity';
import { ImageContainer } from './style';
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
      <BlockRender mode={props.mode} data={children[0]} path={path} />
    </div>
  );
  const renderList = () => (
    <div className={getClass('list') + ' dme-w-list'}>
      <BlockListRender
        blockData={children[1].children || []}
        allowedTypes={getAllowedTypes(blockNode.type)}
        mode={mode}
        path={[...path, 1]}
      />
    </div>
  );

  return (
    <HeroTextContainer className={props.rootClasses}>
      {heroPosition !== 'right' && (
        <>
          {renderImage()}
          {renderList()}
        </>
      )}
      {heroPosition === 'right' && (
        <>
          {renderList()}
          {renderImage()}
        </>
      )}
    </HeroTextContainer>
  );
};

export { HeroText };
