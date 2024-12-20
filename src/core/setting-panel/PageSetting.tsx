import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Delete, DeleteOutline } from '@mui/icons-material';
import { Alert, Button, Checkbox, MenuItem, Select, TextField } from '@mui/material';

import { dmeConfig, ImageSetting } from '../..';
import { getPageSettings } from '../components/page';
import { useEditorStore } from '../main/store';
import { Required, SettingHeader, SettingItem } from './style';

interface SettingTypeProps {
  type: string;
  parameters?: Record<string, any>;
  defaultValue: string | boolean;
  onChange: (value: string | boolean) => void;
}

const SettingType = (props: SettingTypeProps) => {
  const { type, defaultValue, onChange } = props;

  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  switch (type) {
    case 'text':
      return (
        <div>
          <TextField
            value={currentValue}
            fullWidth
            size="small"
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </div>
      );
    case 'checkbox':
      return (
        <Checkbox
          checked={currentValue ? true : false}
          size="small"
          onChange={(e) => setCurrentValue(e.target.checked)}
        />
      );
    case 'image':
      return (
        <div style={{ display: 'flex' }}>
          <ImageSetting
            value={{ src: currentValue as string }}
            onChange={(v) => setCurrentValue(v.src)}
          />
          {currentValue && (
            <div>
              <Button size="small" title="Delete" onClick={() => setCurrentValue('')}>
                <DeleteOutline />
              </Button>
            </div>
          )}
        </div>
      );
    case 'dropdown':
      return (
        <Select
          size="small"
          defaultValue={currentValue}
          displayEmpty
          fullWidth
          onChange={(v) => setCurrentValue(v.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {(props.parameters?.list || []).map((item) => (
            <MenuItem value={item.value}>{item.text}</MenuItem>
          ))}
        </Select>
      );
    case 'multitext':
      return (
        <div>
          <TextField
            value={currentValue}
            fullWidth
            multiline
            rows={5}
            size="small"
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </div>
      );
    default:
      return (
        <div>
          <Alert severity="warning">Unsupported type</Alert>
        </div>
      );
  }
};

const SelectTheme = (props: { value: string; onChange: (value: string) => void }) => {
  return (
    <div>
      <Select
        size="small"
        value={props.value}
        displayEmpty
        fullWidth
        onChange={(v) => props.onChange(v.target.value)}
      >
        <MenuItem value="">None</MenuItem>
        {dmeConfig.general.themes.map((theme) => (
          <MenuItem value={theme.identifier}>{theme.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export const PageSetting = () => {
  const { page, updatePage } = useEditorStore();

  const settings = useMemo(() => {
    return getPageSettings();
  }, []);

  const updatePageValue = (v: string, key: string) => {
    updatePage(v, key);
  };

  return (
    <div style={{ padding: '0px 10px' }}>
      <SettingHeader>Page setting</SettingHeader>
      <SettingItem>
        <label>
          Title: <Required>*</Required>
        </label>
        <SettingType
          type="text"
          defaultValue={page.title}
          onChange={(v) => updatePageValue(v, 'title')}
        />
      </SettingItem>

      {dmeConfig.general.themes.length > 0 && (
        <SettingItem>
          <label>Theme:</label>
          <SelectTheme value={page['theme'] || ''} onChange={(v) => updatePageValue(v, 'theme')} />
        </SettingItem>
      )}

      {settings.map((setting) => (
        <SettingItem>
          <label>{setting.name}:</label>
          <SettingType
            type={setting.type}
            parameters={setting.parameters}
            defaultValue={page[setting.identifier] || ''}
            onChange={(v) => updatePageValue(v, setting.identifier)}
          />
        </SettingItem>
      ))}
    </div>
  );
};
