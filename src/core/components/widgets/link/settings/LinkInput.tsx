import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { ChangeCircle } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { LinkChooser } from 'dmeditor/components/utility/LinkChooser';
import { BrowseLinkCallbackParams } from 'dmeditor/config';
import { useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

import { LinkEntity } from '../Link';

export const LinkInput = () => {
  const { updateSelectedBlock, getSelectedBlock } = useEditorStore();
  const blockData = getSelectedBlock<LinkEntity>();
  const { href = '', externalId, text } = blockData?.data || {};

  const [visible, setVisible] = useState(false);

  const handleChange = (value: string) => {
    updateSelectedBlock((blockData) => {
      blockData.href = value;
      blockData.externalId = '';
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (value: BrowseLinkCallbackParams) => {
    if (value.length > 0) {
      const newValue = value[0];
      updateSelectedBlock((blockData) => {
        blockData.href = newValue.href;
        blockData.text = newValue.text || newValue.href;
        blockData.externalId = newValue.id;
      });
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!href) {
      setVisible(true);
    }
  }, []);

  return (
    <>
      <PropertyItem label="Link">
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <TextField size="small" value={href} onChange={(evt) => handleChange(evt.target.value)} />
          <span className={css({ cursor: 'pointer' })} onClick={() => setVisible(true)}>
            <ChangeCircle />
          </span>
        </div>
      </PropertyItem>
      <LinkChooser
        visible={visible}
        value={[{ href, text, id: externalId }]}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};
