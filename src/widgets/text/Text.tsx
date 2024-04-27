import { MiniText, useEditorStore } from '../..';
import type { DME } from '../..';
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
    <div className={props.rootClasses}>
      <MiniText viewmode={props.mode === 'view'} value={value} onValueChange={handleValueChange} />
    </div>
  );
};

export default Text;
