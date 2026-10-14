import { useState } from 'react';
import styled from '@emotion/styled';
import {
  AddOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteOutline,
  ExpandMoreOutlined,
} from '@mui/icons-material';
import { Button, IconButton, Popover, Radio, TextField } from '@mui/material';

import { i18n } from '../i18n';
import { PropertyButton } from '../utils';
import { ImageSetting } from './ImageSetting';

const OPERATION_COLUMN_WIDTH = 40;

const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  min-width: 100%;
  table-layout: fixed;

  th,
  td {
    font-size: 0.9rem;
  }
`;

const HeaderCell = styled.th`
  padding: 5px;
  font-weight: normal;
  text-align: left;
`;

const OperationHeader = styled(HeaderCell)`
  width: ${OPERATION_COLUMN_WIDTH}px;
  min-width: ${OPERATION_COLUMN_WIDTH}px;
`;

const Cell = styled.td`
  padding: 2px 5px;
  vertical-align: middle;
`;

export const CellOperation = styled.td`
  width: ${OPERATION_COLUMN_WIDTH}px;
  min-width: ${OPERATION_COLUMN_WIDTH}px;
  text-align: right;
  white-space: nowrap;
  vertical-align: middle;

  svg {
    font-size: 16px;
  }
`;

type DataListSchemaItem = {
  name: string;
  identifier: string;
  type: 'text' | 'image' | 'link' | 'radio';
  width?: number | string;
  options?: {
    popUp?: boolean;
  };
};

const columnSize = (width?: number | string) => {
  if (width === undefined) {
    return undefined;
  }
  const value = typeof width === 'number' ? `${width}px` : width;
  return { width: value, minWidth: value };
};

export type DataListSettingProps = {
  data: Array<Record<string, string | boolean>>;
  schema: Array<DataListSchemaItem>;
  width?: number | string;
  onChange: (newData: Array<Record<string, string | boolean>>) => void;
};

const textFieldSx = { '& .MuiInputBase-input': { fontSize: '0.9rem' } };

const InlineText = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const PopoverBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 280px;
  padding: 8px;
`;

const PopoverActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const PopupTextField = (props: { value: string; onChange: (value: string) => void }) => {
  const { value, onChange } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState(value);

  const handleOpen = (event: { currentTarget: HTMLElement }) => {
    setDraft(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    onChange(draft);
    setAnchorEl(null);
  };

  return (
    <>
      <InlineText>
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={textFieldSx}
        />
        <PropertyButton title="Edit in pop over" onClick={handleOpen}>
          <ExpandMoreOutlined sx={{ fontSize: 16 }} />
        </PropertyButton>
      </InlineText>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <PopoverBody>
          <TextField
            autoFocus
            multiline
            minRows={4}
            fullWidth
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': { padding: '4px 6px' },
              '& .MuiInputBase-input': { fontSize: '0.9rem' },
            }}
          />
          <PopoverActions>
            <Button size="small" onClick={handleClose}>
              {i18n('Cancel')}
            </Button>
            <Button size="small" onClick={handleConfirm}>
              {i18n('Confirm')}
            </Button>
          </PopoverActions>
        </PopoverBody>
      </Popover>
    </>
  );
};

export const DataListSettings = (props: DataListSettingProps) => {
  const { data, schema, onChange, width } = props;

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
        <TableScroll>
          <Table style={columnSize(width)}>
            <thead>
              <tr>
                {schema.map((item) => (
                  <HeaderCell key={item.identifier} style={columnSize(item.width)}>
                    {item.name}
                  </HeaderCell>
                ))}
                <OperationHeader />
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {schema.map((item) => (
                    <Cell key={item.identifier} style={columnSize(item.width)}>
                      {item.type === 'text' &&
                        (item.options?.popUp ? (
                          <PopupTextField
                            value={String(row[item.identifier] ?? '')}
                            onChange={(value) => update(value, index, item.identifier)}
                          />
                        ) : (
                          <TextField
                            size="small"
                            fullWidth
                            value={row[item.identifier]}
                            onChange={(e) => update(e.target.value, index, item.identifier)}
                            sx={textFieldSx}
                          />
                        ))}
                      {item.type === 'image' && (
                        <ImageSetting
                          previewMaxSize={50}
                          value={{ src: row[item.identifier] }}
                          onChange={(info) => {
                            update(info?.src || '', index, item.identifier);
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
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      )}
      <IconButton title="Add" onClick={() => addUnder()}>
        <AddOutlined />
      </IconButton>
    </div>
  );
};
