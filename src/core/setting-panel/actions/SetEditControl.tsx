import { useMemo } from 'react';
import { css } from '@emotion/css';
import { MenuItem, Select } from '@mui/material';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DMEData } from 'dmeditor/core/types';
import { getWidget } from 'dmeditor/core/utils/register';

export const SetEditControl = (props: { blockData: DMEData.Block }) => {
  const { updateSelectedBlockEditControl } = useEditorStore();

  const update = (e) => {
    const value = e.target.value;
    updateSelectedBlockEditControl(value);
  };

  // const category = useMemo(() => {
  //   return getWidget(props.blockData.type).category;
  // }, [props.blockData.type]);
  return (
    <div
      className={css`
        padding: 10px;
      `}
    >
      <label>Edit control:</label>
      <Select
        onChange={update}
        size="small"
        defaultValue={props.blockData.editControl === undefined ? 1 : props.blockData.editControl}
      >
        <MenuItem value={1}>Not set</MenuItem>
        <MenuItem value={0}>View only</MenuItem>
        <MenuItem value={2}>Edit but can not delete</MenuItem>
        {/* {category == 'container' && <MenuItem value={10}>Can not add / delete children</MenuItem>} */}
      </Select>
    </div>
  );
};
