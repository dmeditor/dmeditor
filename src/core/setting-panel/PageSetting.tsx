import { useEffect, useMemo, useState } from 'react';
import { Alert, MenuItem, Select, TextField } from '@mui/material';

import { getPageSettings, pageThemes } from '../components/page';
import { useEditorStore } from '../main/store';
import { PropertyItem } from './Property';
import { Required, SettingHeader, SettingItem } from './style';

const SettingType = (props: {
  type: string;
  defaultValue: string;
  onChange: (value: string) => void;
}) => {
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
            value={defaultValue}
            fullWidth
            size="small"
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </div>
      );
    case 'multitext':
      return (
        <div>
          <TextField
            value={defaultValue}
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
        {pageThemes.map((theme) => (
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

      {pageThemes.length > 0 && (
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
            defaultValue={page[setting.identifier] || ''}
            onChange={(v) => updatePageValue(v, setting.identifier)}
          />
        </SettingItem>
      ))}
    </div>
  );
};
