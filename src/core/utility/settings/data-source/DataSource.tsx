import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { DMEData } from 'dmeditor/core/types';
import { PropertyItem } from 'dmeditor/core/utils';

import { VariableTag } from './style';

export const DataSource = (props: {
  widget: string;
  data: DMEData.DataSourceData;
  onChange: (data: DMEData.DataSourceData) => void;
}) => {
  const [data, setData] = useState(props.data);
  const [shown, setShown] = useState(false);

  const { vars } = useGlobalVars();

  const DataSourceCom = dmeConfig.dataSource?.edit;

  const parameterKeys = Object.keys(vars);

  const parameterChange = (e) => {
    const v = e.target.value;
    const list = v.replaceAll(' ', '').split(',');
    setData({ ...data, variables: list });
  };

  const outputValue = (v) => {
    if (Array.isArray(v)) {
      return v.join(',');
    } else {
      return v;
    }
  };

  const confirm = () => {
    props.onChange(data);
  };

  const add = (v: string) => {
    const list = data.variables ?? [];
    if (!list.includes(v)) {
      setData({ ...data, variables: [...list, v] });
    }
  };

  return (
    <div>
      {props.data && Object.keys(props.data).length > 0 && (
        <div>
          {Object.keys(props.data).map((item) => (
            <div>
              <label>{item}: </label>
              {outputValue(data[item])}
            </div>
          ))}
        </div>
      )}
      <Button onClick={() => setShown(true)}>Choose</Button>
      <Dialog open={shown} onClose={() => setShown(false)}>
        <DialogTitle>Data source</DialogTitle>
        <DialogContent>
          <Box>
            {DataSourceCom && (
              <DataSourceCom widget={props.widget} data={props.data} onChange={props.onChange} />
            )}
          </Box>
          <Box>
            <div>
              <div>
                <label>Parameter:</label>
                <TextField
                  value={data.variables ? data.variables.join(',') : ''}
                  size="small"
                  onChange={parameterChange}
                />
              </div>
              {parameterKeys.length > 0 && (
                <div>
                  <label>Parameters from other widgets:</label>
                  {parameterKeys.map((item) => (
                    <VariableTag onClick={() => add(item)}>{item}</VariableTag>
                  ))}
                </div>
              )}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              confirm();
              setShown(false);
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => setShown(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
