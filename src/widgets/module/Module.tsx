import { css } from '@emotion/css';
import { Button, MenuItem, Select } from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types';
import { RenderToSetting } from 'dmeditor/core/utility';
import { PropertyItem } from 'dmeditor/core/utils';

import { EntityModule } from './EntityModule';

export const Module = (props: DME.WidgetRenderProps<EntityModule>) => {
  const { data } = props.blockNode;

  const { updateBlockByPath } = useEditorStore();

  const handleChange = (v: string) => {
    updateBlockByPath(props.path, (data: EntityModule) => {
      data.module = v;
    });
  };

  const modules = dmeConfig.widgets['module'].modules;

  return (
    <div>
      {props.mode === 'edit' && props.active && (
        <RenderToSetting>
          <PropertyItem label="Module">
            <Select
              size="small"
              displayEmpty
              value={data.module}
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {modules.map((item: any) => (
                <MenuItem value={item.identifier}>{item.name}</MenuItem>
              ))}
            </Select>
          </PropertyItem>
        </RenderToSetting>
      )}
      {props.mode === 'edit' && (
        <div
          className={css`
            padding: 20px;
            background-color: #f0f0f0;
            text-align: center;
          `}
        >
          {data.module && <div>Module: {data.module}</div>}
          {!data.module && <div>Plese select a module.</div>}
        </div>
      )}

      {props.mode === 'view' && (
        <div>{modules.find((item: any) => item.identifier === data.module)?.render()} </div>
      )}
    </div>
  );
};
