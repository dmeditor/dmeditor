import { MiniRichText, useEditorStore, type DME } from '../..';
import { EntityText } from './entity';
import { TextContainer } from './styled';

interface RichTextProps extends DME.WidgetRenderProps<EntityText> {}

const Text = (props: RichTextProps) => {
  const {
    active,
    blockNode: {
      data: { value },
      data,
    },
    path,
  } = props;
  const { updateBlockByPath } = useEditorStore();
  const handleValueChange = (newValue: Array<any>) => {
    if (active) {
      updateBlockByPath<EntityText>(path, (entity) => {
        entity.value = newValue;
      });
    }
  };
  return (
    <TextContainer {...data.settings}>
      <MiniRichText mode={props.mode} value={value} onValueChange={handleValueChange} />
    </TextContainer>
  );
};

export default Text;
