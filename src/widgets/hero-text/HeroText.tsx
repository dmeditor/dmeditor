import { BlockRender, useDevice } from '../..';
import type { DME, DMEData } from '../..';
import { EntityHeroText, EntityHeroTextChildren } from './entity';
import { HeroImageDiv, HeroTextContainer } from './styled';

const HeroText: React.FC<DME.WidgetRenderProps<EntityHeroText, EntityHeroTextChildren>> = (
  props,
) => {
  const {
    blockNode: {
      children,
      data: { heroPosition, heroPositionMobile, heroFullWidth, gap },
    },
    path,
    mode,
    styleClasses,
  } = props;

  if (!children) {
    return <></>;
  }

  const getClass = (type: string) => {
    if (!styleClasses || !styleClasses[type]) {
      return '';
    }
    return styleClasses[type].join(' ');
  };

  const device = useDevice();

  const calculatedHeroPosition =
    device === 'mobile'
      ? heroPositionMobile === 'down'
        ? 'end'
        : 'start'
      : heroPosition === 'right'
        ? 'end'
        : 'start';

  const renderImage = () => (
    <HeroImageDiv
      heroPostion={calculatedHeroPosition}
      fullWidth={heroFullWidth}
      className={getClass('hero') + ' dme-w-hero'}
    >
      <BlockRender mode={mode} data={children.hero} path={[...path, 'hero']} />
    </HeroImageDiv>
  );
  const renderList = () => (
    <div className={getClass('list') + ' dme-w-list'}>
      <BlockRender data={children.list} mode={mode} path={[...path, 'list']} />
    </div>
  );

  return (
    <HeroTextContainer updown={device === 'mobile'} gap={gap}>
      {calculatedHeroPosition === 'start' && (
        <>
          {renderImage()}
          {renderList()}
        </>
      )}
      {calculatedHeroPosition === 'end' && (
        <>
          {renderList()}
          {renderImage()}
        </>
      )}
    </HeroTextContainer>
  );
};

export { HeroText };
