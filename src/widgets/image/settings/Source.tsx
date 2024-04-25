import { ImageSetting, useEditorStore } from '../../../core';
import { ImageInfo } from '../../../core/config';
import { PropertyItem } from '../../../core/utils';
import { ImageEntity } from '../Image';

export const Source = () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { src } = data || {};

  const handleChange = (value: ImageInfo) => {
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
