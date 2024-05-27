import { MiniText, useEditorStore, type DME } from '../..';
import { EntityText } from './entity';

interface RichTextProps extends DME.WidgetRenderProps<EntityText> {}

const Text = (props: RichTextProps) => {
  const {
    active,
    blockNode: {
      data: { value },
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
    <div className={props.rootClasses}>
      <MiniText mode={props.mode} value={value} onValueChange={handleValueChange} />
    </div>
  );
};

export default Text;
