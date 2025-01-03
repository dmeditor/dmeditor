import { useSettingStatus } from 'dmeditor/core/main/store';

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

  const { isActive: isSettingActive, setIsActive: setIsSettingActive } = useSettingStatus();

  const mode = props.active
    ? props.mode === 'edit' && !isSettingActive
      ? 'edit'
      : 'view'
    : props.mode;

  return (
    <TextContainer
      {...data.settings}
      onMouseEnter={() => {
        if (isSettingActive) {
          setIsSettingActive(false);
        }
      }}
    >
      <MiniRichText mode={mode} value={value} onValueChange={handleValueChange} />
    </TextContainer>
  );
};

export default Text;
