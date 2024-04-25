import { useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { CloudOutlined } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';

import { useEditorStore } from '../../../../core';
import { BrowseLinkCallbackParams } from '../../../config';
import type { DME } from '../../../types';
import { LinkChooser, LinkRef } from '../../../utility';

export const Link = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { updateSelectedBlockProps } = useEditorStore();
  const linkRef = useRef<LinkRef>(null);

  const handleChange = (value: string) => {
    updateSelectedBlockProps(property || '', value);
  };

  const handleConfirm = (value: BrowseLinkCallbackParams) => {
    if (value) {
      updateSelectedBlockProps(property || '', value);
    }
  };

  useEffect(() => {
    if (!value) {
      linkRef.current?.open();
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
          onClick={() => linkRef.current?.open()}
        >
          <CloudOutlined />
        </Button>
      </div>
      <LinkChooser
        ref={linkRef}
        defaultVisible={!value}
        value={value as string}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default Link;
