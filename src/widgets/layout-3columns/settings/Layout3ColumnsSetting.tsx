import { useEffect, useState } from 'react';

import { useEditorStore } from '../../..';
import type { DME } from '../../../core/types';
import { PropertyItem, Ranger } from '../../../core/utils';
import { EntityLayout3Columns } from '../Layout3Columns';

export const Layout3ColumnsSetting = (props: DME.SettingComponentProps) => {
  const { blockPath } = props;
  const { updateBlockByPath, getBlockByPath } = useEditorStore();

  const blockData = getBlockByPath<EntityLayout3Columns>(blockPath);

  const [column1Width, setColumn1Width] = useState(blockData?.data.column1Width || 4);
  const [column2Width, setColumn2Width] = useState(blockData?.data.column2Width || 4);

  const totalWidth = 12;

  const handleChange1 = (v: number) => {
    const max = totalWidth - column2Width;
    if (v < max) {
      setColumn1Width(v);
    }
  };

  const handleChange2 = (v: number) => {
    const max = totalWidth - column1Width;
    if (v < max) {
      setColumn2Width(v);
    }
  };

  useEffect(() => {
    updateBlockByPath<EntityLayout3Columns>(blockPath, (data) => {
      data.column1Width = column1Width;
      data.column2Width = column2Width;
    });
  }, [column1Width, column2Width]);

  return (
    <div style={{ marginTop: 20 }}>
      <PropertyItem label="Column1 width">
        {/* todo: support showing disabled area where you can't slide to */}
        <Ranger
          defaultValue={blockData?.data.column1Width}
          min={1}
          max={11}
          step={1}
          onChange={handleChange1}
        ></Ranger>
      </PropertyItem>

      <PropertyItem label="Column2 width">
        <Ranger
          defaultValue={blockData?.data.column2Width}
          min={1}
          max={11}
          step={1}
          onChange={handleChange2}
        ></Ranger>
      </PropertyItem>
    </div>
  );
};
