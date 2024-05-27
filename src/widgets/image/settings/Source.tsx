import { DME, ImageSetting, useEditorStore } from '../../..';
import { PropertyItem } from '../../../core/utils';
import { ImageEntity } from '../Image';

export const Source = (props: DME.SettingComponentProps<ImageEntity>) => {
  const {
    block: { data },
    blockPath,
  } = props;
  const { updateBlockByPath } = useEditorStore();
  const { src } = data || {};

  const handleChange = (value: DME.ImageInfo) => {
    updateBlockByPath<ImageEntity>(blockPath, (blockData) => {
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
