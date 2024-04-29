import { DME, ImageSetting, useEditorStore } from 'dmeditor/index';

const Image = (props: { value?: string; property: string }) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleChange = (value: DME.ImageInfo) => {
    updateSelectedBlockProps(property, value?.src);
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
