import { useEditorStore } from '../../../..';
import { DME } from '../../../types';

const Date = (
  props: DME.SettingComponentProps & {
    property: string;
    value?: {
      date: string;
      time: string;
    };
    parameters: {
      withTime?: boolean;
    };
    disabled?: boolean;
  },
) => {
  const { value, disabled, blockPath, property, parameters = {} } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const dateValue = value?.date || '';
  const timeValue = value?.time || '';

  console.log(value);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    updateBlockPropsByPath(blockPath, property || '', { date, time: timeValue });
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    updateBlockPropsByPath(blockPath, property || '', { date: dateValue, time });
  };

  return (
    <div>
      <input
        style={{ padding: 5, fontFamily: 'Arial', fontSize: 15 }}
        type="date"
        onChange={onDateChange}
        defaultValue={dateValue}
        disabled={disabled}
      />
      {parameters.withTime && (
        <input
          style={{ marginLeft: 5, padding: 5, fontFamily: 'Arial', fontSize: 15 }}
          type="time"
          onChange={onTimeChange}
          defaultValue={timeValue}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Date;
