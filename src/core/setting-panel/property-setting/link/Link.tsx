import { useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { CloudOutlined } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';

import { useEditorStore } from '../../../..';
import { BrowseLinkCallbackParams } from '../../../config';
import type { DME } from '../../../types';
import { LinkChooser, LinkRef } from '../../../utility';

export const Link = (props: DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { urlOnly, showDialogWhenEmpty } = props.parameters || {};
  const { updateBlockPropsByPath } = useEditorStore();
  const linkRef = useRef<LinkRef>(null);

  const handleChange = (value: string) => {
    updateBlockPropsByPath(blockPath, property || '', value);
  };

  const handleConfirm = (value: BrowseLinkCallbackParams) => {
    if (value) {
      updateBlockPropsByPath(blockPath, property || '', value.link);
    }
  };

  useEffect(() => {
    if (!value && showDialogWhenEmpty) {
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
        urlOnly={urlOnly}
        defaultVisible={showDialogWhenEmpty && !value}
        value={{ link: (value || '') as string }}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default Link;
