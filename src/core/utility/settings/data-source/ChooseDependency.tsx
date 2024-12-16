import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEditorStore } from 'dmeditor/core/main/store';
import { getDependencyOptions } from 'dmeditor/core/main/store/helper';
import { DMEData } from 'dmeditor/core/types';
import { getWidget } from 'dmeditor/core/utils';

export const ChooseDependency = (props: {
  widget: string;
  value?: { id: string; type: string };
  onChange: (v?: { id: string; type: string }) => void;
}) => {
  const { storage } = useEditorStore();

  const [dependencyList, setDependencyList] = useState<DMEData.Block[]>([]);

  const [dependency, setDependency] = useState(props.value?.id || '');

  useEffect(() => {
    const list = getDependencyOptions(props.widget, storage);
    if (list) {
      setDependencyList(list);
    }
  }, []);

  const update = (v: string) => {
    if (!v) {
      props.onChange(undefined);
    } else {
      setDependency(v);
      const type = dependencyList.find((item) => item.id === v)?.type;
      props.onChange({ id: v, type: type || '' });
    }
  };

  return (
    <div>
      <label>Choose block which it can be dependent on.</label>
      <Box sx={{ mt: 2 }}>
        <FormControl>
          <Select
            size="small"
            sx={{ width: 200 }}
            value={dependency}
            displayEmpty
            onChange={(e) => update(e.target.value as string)}
          >
            <MenuItem value={''}>None</MenuItem>
            {dependencyList.map((item) => (
              <MenuItem value={item.id} title={item.id}>
                {getWidget(item.type).name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
