import { MiniText } from 'dmeditor/components/utility';
import { EntityText } from 'dmeditor/components/widgets/text/entity';
import { useEditorStore } from 'dmeditor/index';
import type { DME } from 'dmeditor/index';

// import type { Descendant } from 'slate';

interface RichTextProps extends DME.WidgetRenderProps<EntityText> {}

const Text = (props: RichTextProps) => {
  const {
    active,
    blockNode: {
      data: { value },
    },
  } = props;
  const { updateSelectedBlock } = useEditorStore();
  const handleValueChange = (newValue: Array<any>) => {
    if (active) {
      updateSelectedBlock<EntityText>((entity) => {
        entity.value = newValue;
      });
    }
  };
  return <MiniText value={value} onValueChange={handleValueChange} />;
};

export default Text;
