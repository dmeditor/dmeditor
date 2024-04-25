import { MiniText, useEditorStore } from '../../core';
import type { DME } from '../../core';
import { EntityText } from './entity';

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
  return (
    <MiniText viewmode={props.mode === 'view'} value={value} onValueChange={handleValueChange} />
  );
};

export default Text;
