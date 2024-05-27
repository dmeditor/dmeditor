import { ImageSetting, useEditorStore, type DME } from '../../../../index';

const Image = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (value: DME.ImageInfo) => {
    updateBlockPropsByPath(blockPath, property, value?.src);
  };

  return (
    <ImageSetting
      value={{ src: value || '', id: value }}
      defaultVisible={false}
      onChange={handleChange}
    />
  );
};

export default Image;
