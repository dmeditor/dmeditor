import { useState } from 'react';
import { css } from '@emotion/css';
import { CancelOutlined, ContentPaste, DeleteOutline } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { WidgetList } from '../components/widget-list';
import { dmeConfig } from '../config';
import { i18n } from '../i18n';
import { useEditorStore } from '../main/store';
import { getListByPath } from '../main/store/helper';
import {
  AddBlockContainer,
  AdddBlockHeader,
  RightElement,
  SettingDescription,
  SettingHeader,
  WidgetListContainer,
} from './style';

export const AddBlock = () => {
  const {
    addBlock,
    cancelAdding,
    getCopyBlock,
    insertBlock,
    addBlockData,
    clearCopyBlock,
    setSelected,
    storage,
  } = useEditorStore((state) => state);

  const addBlockDone = (type: string, addedData: { style?: string; savedBlock?: any }) => {
    addBlock(type, addedData);
  };

  const cancel = () => {
    cancelAdding();
  };

  const handlePaste = () => {
    const copyBlock = getCopyBlock();

    if (!addBlockData || !copyBlock) {
      return;
    }

    const index = addBlockData.index;
    let newIndex = 0;
    const listData = getListByPath(storage, addBlockData.context);
    if (!listData) {
      return;
    }
    if (listData.length === 0) {
      newIndex = 0;
    } else {
      newIndex = addBlockData.position === 'before' ? index : index + 1;
    }

    insertBlock(copyBlock, [...addBlockData.context, newIndex]);

    //cancel wizard
    cancelAdding();

    setSelected(newIndex, addBlockData.context);
  };

  const [hasCopy, setHasCopy] = useState(
    localStorage.getItem(dmeConfig.editor.clipboardKey) ? true : false,
  );

  return (
    <AddBlockContainer>
      <AdddBlockHeader>
        <RightElement>
          <Button onClick={() => cancel()}>
            <CancelOutlined />
          </Button>
        </RightElement>
        <SettingHeader>{i18n('Add block')}</SettingHeader>
        <SettingDescription>{i18n('Please choose a widget')}</SettingDescription>
      </AdddBlockHeader>
      <WidgetListContainer>
        {hasCopy && (
          <div
            className={css`
              margin: 10px 10px 0px 10px;
              border: 1px solid #f0f0f0;
              border-radius: 5px;
              padding: 8px 5px;
              color: #666666;
              cursor: pointer;
              position: relative;

              &:hover {
                background-color: white;
              }
            `}
          >
            <IconButton
              title={i18n('Clear clipboard')}
              disableRipple
              size="small"
              onClick={(e) => {
                clearCopyBlock();
                setHasCopy(false);
              }}
              style={{ position: 'absolute', right: 0, top: 0 }}
            >
              <DeleteOutline />
            </IconButton>
            <div
              className={css`
                display: flex;
                align-items: center;
                gap: 4px;
              `}
              onClick={handlePaste}
            >
              <ContentPaste style={{ color: '#333', fontSize: 20 }} />
              <span>{i18n('Paste from clipboard')}</span>
            </div>
          </div>
        )}
        <WidgetList filter={addBlockData?.types} onSelect={addBlockDone} />
      </WidgetListContainer>
    </AddBlockContainer>
  );
};
