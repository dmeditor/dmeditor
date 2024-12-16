import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { DMEData } from 'dmeditor/core/types';

import { ChooseDependency } from './ChooseDependency';

export const DataSource = (props: {
  widget: string;
  data: DMEData.DataSourceData;
  multi: boolean;
  onChange: (data: DMEData.DataSourceData) => void;
}) => {
  const [data, setData] = useState(props.data);
  const [shown, setShown] = useState(false);

  const DataSourceCom = dmeConfig.dataSource?.edit;

  const [sourceType, setSourceType] = useState(
    data.dependency ? 'dependency' : data.variables ? 'parameter' : 'fixed',
  );

  const parameterChange = (e) => {
    const v = e.target.value;
    const list = v.replaceAll(' ', '').split(',');
    setData({ variables: list });
  };

  const outputValue = (v) => {
    if (!v) {
      return '';
    }
    if (Array.isArray(v)) {
      return v.join(',');
    } else if (typeof v === 'object') {
      let result = '';
      for (const key of Object.keys(v)) {
        result += key + ': ' + v[key] + ';';
      }
      return result;
    } else {
      return v + '';
    }
  };

  const confirm = () => {
    props.onChange(data);
  };

  const updateDependency = (v: { id: string; type: string }) => {
    setData({ dependency: v });
  };

  return (
    <div>
      {props.data && Object.keys(props.data).length > 0 && (
        <div>
          {Object.keys(props.data).map((item) => (
            <div>
              <label>{item}: </label>
              <div>{outputValue(data[item])}</div>
            </div>
          ))}
        </div>
      )}
      <Button onClick={() => setShown(true)}>Choose</Button>
      <Dialog open={shown} onClose={() => setShown(false)}>
        <DialogTitle>Data source</DialogTitle>
        <DialogContent>
          <Tabs onChange={(e, v) => setSourceType(v)} value={sourceType}>
            <Tab label="Fixed" value="fixed" />
            <Tab label="Dependency" value="dependency" />
            <Tab label="Parameter" value="parameter" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {sourceType === 'fixed' && (
              <div>
                {DataSourceCom && (
                  <DataSourceCom
                    widget={props.widget}
                    mutil={props.multi}
                    data={props.data}
                    onChange={(d) => setData(d)}
                  />
                )}
              </div>
            )}
            {sourceType === 'dependency' && (
              <div>
                <div>
                  <ChooseDependency
                    value={props.data.dependency}
                    widget={props.widget}
                    onChange={updateDependency}
                  />
                </div>
              </div>
            )}
            {sourceType === 'parameter' && (
              <div>
                <div>
                  <label>Location parameter:</label>
                  <TextField
                    value={data.variables ? data.variables.join(',') : ''}
                    size="small"
                    onChange={parameterChange}
                  />
                </div>
              </div>
            )}
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
