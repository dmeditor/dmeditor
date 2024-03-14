import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { ChangeCircle, CloudOutlined } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { LinkChooser } from 'dmeditor/components/utility/LinkChooser';
import { BrowseLinkCallbackParams } from 'dmeditor/config';
import { DME } from 'dmeditor/index';
import { useEditorStore } from 'dmeditor/main/store';

export const Link = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const [visible, setVisible] = useState(false);

  const handleChange = (value: string) => {
    updateSelectedBlockProps(property || '', value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (value: BrowseLinkCallbackParams) => {
    if (value.length > 0) {
      const newValue = value[0];
      updateSelectedBlockProps(property || '', newValue.href);
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!value) {
      setVisible(true);
    }
  }, []);

  return (
    <>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <TextField size="small" value={value} onChange={(evt) => handleChange(evt.target.value)} />
        <Button
          title="Browse library"
          className={css({ cursor: 'pointer' })}
          onClick={() => setVisible(true)}
        >
          <CloudOutlined />
        </Button>
      </div>
      <LinkChooser
        visible={visible}
        value={[{ href: value as string }]}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default Link;
