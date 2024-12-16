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
import { DMEData } from 'dmeditor/core/types';

import { ChooseDependency } from './ChooseDependency';

export const DataSource = (props: {
  widget: string;
  data: DMEData.DataSourceData;
  multi: boolean;
  onChange: (data?: DMEData.DataSourceData) => void;
}) => {
  const [data, setData] = useState<DMEData.DataSourceData>(props.data || {});
  const [shown, setShown] = useState(false);

  const sourceData = data.sourceData;

  const DataSourceCom = dmeConfig.dataSource?.edit;

  const [sourceType, setSourceType] = useState(data.type);

  const parameterChange = (e) => {
    const v = e.target.value;
    const list = v.replaceAll(' ', '').split(',');
    setData({ type: 'variable', sourceData: list });
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
        result += key + ': ' + v[key] + '\n';
      }
      return result;
    } else {
      return v + '';
    }
  };

  const confirm = () => {
    props.onChange(data);
  };

  const updateDependency = (v?: { id: string; type: string }) => {
    if (!v) {
      window.alert('Can not set to none');
    } else {
      setData({ type: 'dependency', sourceData: v });
    }
  };

  const changeTab = (v) => {
    setSourceType(v);
  };

  const renderExistingData = () => {
    return (
      <div>
        {props.data.type === 'fixed' && (
          <div>
            <label>Content:</label>
            <div>
              {Object.keys(props.data.sourceData).map((key) => (
                <div>
                  <label>{key}: </label>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {outputValue(props.data.sourceData[key])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {props.data.type === 'dependency' && (
          <div>
            <label>Widget:</label>
            <div title={'id: ' + props.data.sourceData.id}>{props.data.sourceData.type}</div>
          </div>
        )}
        {props.data.type === 'variable' && (
          <div>
            <label>Variables: </label>
            <div>{props.data.sourceData.join(',')}</div>
          </div>
        )}
      </div>
    );
  };

  const open = () => {
    setShown(true);
    setData(props.data);
    setSourceType(props.data.type);
  };

  return (
    <div>
      {renderExistingData()}
      <Button onClick={open}>Choose</Button>
      <Dialog open={shown} onClose={() => setShown(false)}>
        <DialogTitle>Data source</DialogTitle>
        <DialogContent>
          <Tabs onChange={(e, v) => changeTab(v)} value={sourceType}>
            <Tab label="Fixed" value="fixed" />
            <Tab label="Dependency" value="dependency" />
            <Tab label="Parameter" value="variable" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {sourceType === 'fixed' && (
              <div>
                {DataSourceCom && (
                  <DataSourceCom
                    widget={props.widget}
                    mutil={props.multi}
                    data={props.data.type === 'fixed' ? sourceData : undefined}
                    onChange={(d) => setData({ type: 'fixed', sourceData: d })}
                  />
                )}
              </div>
            )}
            {sourceType === 'dependency' && (
              <div>
                <div>
                  <ChooseDependency
                    value={props.data.type === 'dependency' ? sourceData : undefined}
                    widget={props.widget}
                    onChange={updateDependency}
                  />
                </div>
              </div>
            )}
            {sourceType === 'variable' && (
              <div>
                <div>
                  <label>Location parameter:</label>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      defaultValue={props.data.type === 'variable' ? sourceData.join(',') : ''}
                      size="small"
                      onChange={parameterChange}
                    />
                  </Box>
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
