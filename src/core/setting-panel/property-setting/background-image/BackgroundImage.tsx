import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';

import { DME, dmeConfig, DMEData, i18n, ImageSetting, useEditorStore } from '../../../..';
import { PickColor, useRecentColors } from '../../../utils/PickColor';

const BackgroundImage = (
  props: { value?: DMEData.BackgroundImageType; property: string } & DME.SettingComponentProps,
) => {
  const { property, value, blockPath, parameters } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = () => {
    updateBlockPropsByPath(blockPath, property, currentValue);
  };

  useEffect(() => {
    handleChange();
  }, [currentValue]);

  return (
    <div>
      <ImageSetting
        value={{ src: currentValue?.image || '' }}
        onChange={(v) => {
          setCurrentValue({ ...currentValue, image: v.src });
        }}
      />
      <div>
        <label>
          <Checkbox
            size="small"
            onChange={(e) =>
              setCurrentValue(
                currentValue ? { ...currentValue, fixed: e.target.checked } : undefined,
              )
            }
          />{' '}
          Fixed when scroll
        </label>
      </div>
    </div>
  );
};

export default BackgroundImage;
