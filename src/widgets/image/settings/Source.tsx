import { DME, ImageSetting, useEditorStore } from '../../..';
import { PropertyItem } from '../../../core/utils';
import { ImageEntity } from '../Image';

export const Source = () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { src } = data || {};

  const handleChange = (value: DME.ImageInfo) => {
    updateSelectedBlock<ImageEntity>((blockData) => {
      blockData.src = value?.src;
      blockData.externalId = value?.id;
      blockData.thumbnail = value?.thumbnail;
    });
  };

  return (
    <PropertyItem label="Source">
      <ImageSetting
        value={{ src: src || '', id: data?.externalId }}
        defaultVisible={!src}
        onChange={handleChange}
      />
    </PropertyItem>
  );
};
