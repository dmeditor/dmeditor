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

  const hasCopy = localStorage.getItem(dmeConfig.editor.clipboardKey);

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
              margin-top: 10;
              padding: 5px 10px;
              display: flex;
              align-items: center;
              gap: 4px;
              color: '#666666';
              cursor: pointer;

              &:hover {
                background-color: white;
              }
            `}
            onClick={handlePaste}
          >
            <ContentPaste style={{ color: '#333' }} />
            <span>{i18n('Paste from clipboard')}</span>
            <IconButton
              title={i18n('Clear clipboard')}
              onClick={(e) => {
                e.stopPropagation();
                clearCopyBlock();
              }}
            >
              <DeleteOutline />
            </IconButton>
          </div>
        )}
        <WidgetList filter={addBlockData?.types} onSelect={addBlockDone} />
      </WidgetListContainer>
    </AddBlockContainer>
  );
};
