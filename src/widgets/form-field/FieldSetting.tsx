import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Checkbox, Input, TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/core/main/store';
import { DataListSettings } from 'dmeditor/core/utility';
import { NumberInput } from 'dmeditor/core/utility/settings/number-input/NumberInput';
import { PropertyItem, Ranger } from 'dmeditor/core/utils';

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

  const updateRow = (v) => {
    updateBlockByPath(props.path, (blockData: EntityFormField) => {
      blockData.rows = v;
    });
  };

  const changeFileFormat = (v) => {
    updateBlockByPath(props.path, (blockData: EntityFormField) => {
      blockData.params = { ...blockData.params, fileFormat: v };
    });
  };

  return (
    <div>
      <div>
        {(fieldType === 'text' || fieldType === 'textarea') && (
          <PropertyItem label="Default value">
            <TextField
              defaultValue={props.data.defaultValue}
              onChange={(e) => {
                changeDefaultValue(e.target.value);
              }}
            />
          </PropertyItem>
        )}
        {fieldType === 'textarea' && (
          <PropertyItem label="Rows">
            <Ranger
              min={5}
              max={30}
              defaultValue={props.data.rows}
              onChange={(v) => updateRow(v)}
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
        {fieldType === 'file' && (
          <div>
            <PropertyItem
              label="Allowed formats"
              description="Separated by comma(,) eg. image/*, .doc, .pdf"
            >
              <TextField
                defaultValue={props.data.params?.fileFormat || '*'}
                onBlur={(e) => {
                  changeFileFormat(e.target.value);
                }}
              />
            </PropertyItem>
          </div>
        )}
      </div>
    </div>
  );
};
