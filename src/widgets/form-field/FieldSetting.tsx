import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Checkbox, Input, TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DataListSettings } from 'dmeditor/core/utility';
import { PropertyItem } from 'dmeditor/core/utils';

import { EntityFormField } from './entity';

export const FieldSettings = (props: { data: EntityFormField; path: (string | number)[] }) => {
  const fieldType = props.data.type;

  const { updateBlockByPath } = useEditorStore();

  const changeDefaultValue = (v) => {
    updateBlockByPath(props.path, (blockData: EntityFormField) => {
      blockData.defaultValue = v;
    });
  };

  const updateOptions = (v) => {
    updateBlockByPath(props.path, (blockData: EntityFormField) => {
      blockData.options = v;
    });
  };

  return (
    <div>
      <div>
        {(fieldType === 'text' || fieldType === 'textarea') && (
          <PropertyItem label="Default value">
            <TextField
              onChange={(e) => {
                changeDefaultValue(e.target.value);
              }}
            />
          </PropertyItem>
        )}
        {fieldType === 'checkbox' && (
          <PropertyItem label="Default checked">
            <Checkbox
              onChange={(e) => {
                changeDefaultValue(e.target.checked);
              }}
            />
          </PropertyItem>
        )}
        {(fieldType === 'select' || fieldType === 'radio') && (
          <div>
            <DataListSettings
              schema={[
                { name: 'Text', identifier: 'text', type: 'text' },
                { name: 'Value', identifier: 'value', type: 'text' },
                { name: 'Default', identifier: 'isDefault', type: 'radio' },
              ]}
              data={props.data.options || []}
              onChange={(data) => {
                updateOptions(data);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
