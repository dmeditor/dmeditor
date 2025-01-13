import * as React from 'react';
import styled from '@emotion/styled';
import {
  AddOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import { IconButton, Input, Radio, TextField } from '@mui/material';

import { PropertyButton } from '../utils';
import { ImageSetting } from './ImageSetting';

const Row = styled.div<{ header?: boolean }>`
  ${(props) =>
    props.header ? { textAlign: 'center', padding: '5px 0px', fontSize: '1.1rem' } : {}}
  display: flex;
`;

const Cell = styled.div`
  padding: 2px 5px;
  flex: 1;
`;

export const CellOperation = styled.div`
  width: 35%;
  text-align: right;
`;

export type DataListSettingProps = {
  data: Array<Record<string, string | boolean>>;
  schema: Array<{ name: string; identifier: string; type: 'text' | 'image' | 'link' | 'radio' }>;
  onChange: (newData: Array<Record<string, string | boolean>>) => void;
};

export const DataListSettings = (props: DataListSettingProps) => {
  const { data, schema, onChange } = props;

  const handleMoveUp = (e: MouseEvent, index: number) => {
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index - 1];
    newData[index - 1] = temp;
    onChange(newData);
  };
  const handleMoveDown = (e: MouseEvent, index: number) => {
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index + 1];
    newData[index + 1] = temp;
    onChange(newData);
  };

  const update = (value: string, row: number, identifier: string) => {
    const newData = [...data];
    const item = { ...newData[row], [identifier]: value };
    newData[row] = item;
    onChange(newData);
  };

  const updateRadio = (row: number, identifier: string) => {
    const newData = [...data];
    newData.forEach((item, index) => {
      const newItem = { ...item };
      if (index === row) {
        newItem[identifier] = true;
      } else {
        if (newItem[identifier] !== undefined) {
          delete newItem[identifier];
        }
      }
      newData[index] = newItem;
    });
    onChange(newData);
  };

  const handleDelete = (e, index) => {
    if (data.length > 1) {
      const newData = [...data];
      newData.splice(index, 1);
      onChange(newData);
    }
  };

  const addUnder = () => {
    const newData = [...data];
    const newItem: Record<string, string> = {};
    for (const sItem of schema) {
      newItem[sItem.identifier] = '';
    }
    newData.push(newItem);
    onChange(newData);
  };

  return (
    <div>
      {Array.isArray(data) && (
        <div>
          <Row header={true}>
            {schema.map((item) => (
              <Cell>{item.name}</Cell>
            ))}
            <Cell></Cell>
          </Row>
          {data.map((row, index) => (
            <Row>
              {schema.map((item) => (
                <Cell>
                  {item.type === 'text' && (
                    <TextField
                      size="small"
                      value={row[item.identifier]}
                      onChange={(e) => update(e.target.value, index, item.identifier)}
                    />
                  )}
                  {item.type === 'image' && (
                    <ImageSetting
                      value={{ src: row[item.identifier] }}
                      onChange={(info) => {
                        update(info.src, index, item.identifier);
                      }}
                    />
                  )}
                  {item.type === 'radio' && (
                    <Radio
                      checked={row[item.identifier] ? true : false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateRadio(index, item.identifier);
                        }
                      }}
                    />
                  )}
                </Cell>
              ))}
              <CellOperation>
                {index !== 0 && (
                  <PropertyButton
                    color="warning"
                    title="Move up"
                    onClick={(e) => handleMoveUp(e, index)}
                  >
                    <ArrowUpwardOutlined />
                  </PropertyButton>
                )}
                {index !== data.length - 1 && (
                  <PropertyButton
                    color="warning"
                    title="Move down"
                    onClick={(e) => handleMoveDown(e, index)}
                  >
                    <ArrowDownwardOutlined />
                  </PropertyButton>
                )}
                <PropertyButton
                  color="warning"
                  title="Delete"
                  onClick={(e) => handleDelete(e, index)}
                >
                  <DeleteOutline />
                </PropertyButton>
              </CellOperation>
            </Row>
          ))}
        </div>
      )}
      <IconButton title="Add" onClick={() => addUnder()}>
        <AddOutlined />
      </IconButton>
    </div>
  );
};
