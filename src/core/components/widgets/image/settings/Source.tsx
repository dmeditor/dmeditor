import { ImageSetting } from 'dmeditor/components/utility/ImageSetting';
import { ImageInfo } from 'dmeditor/config';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

import { ImageEntity } from '../Image';

export const Source = () => {
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const { src } = data || {};

  const handleConfirm = (value: ImageInfo) => {
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
        onConfirm={handleConfirm}
      />
    </PropertyItem>
  );
};
