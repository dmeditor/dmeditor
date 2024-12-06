import { BlockRender, useDevice } from '../..';
import type { DME, DMEData } from '../..';
import { EntityHeroText } from './entity';
import { HeroImageDiv, HeroTextContainer } from './styled';

const HeroText: React.FC<DME.WidgetRenderProps<EntityHeroText, DMEData.DefaultBlockType, {}>> = (
  props,
) => {
  const {
    blockNode: {
      children,
      data: { heroPosition, heroFullWidth, gap },
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

  const renderImage = () => (
    <HeroImageDiv
      heroPostion={heroPosition}
      fullWidth={heroFullWidth}
      className={getClass('hero') + ' dme-w-hero'}
    >
      <BlockRender
        mode={mode}
        data={children.image as DMEData.DefaultBlockType}
        path={[...path, 'image']}
      />
    </HeroImageDiv>
  );
  const renderList = () => (
    <div className={getClass('list') + ' dme-w-list'}>
      <BlockRender data={children.list} mode={mode} path={[...path, 'list']} />
    </div>
  );

  const imageLeft = () => {
    return heroPosition !== 'right' || device === 'mobile';
  };

  return (
    <HeroTextContainer updown={device === 'mobile'} gap={gap}>
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
