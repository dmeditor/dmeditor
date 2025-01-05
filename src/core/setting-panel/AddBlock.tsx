import { CancelOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { WidgetList } from '../components/widget-list';
import { i18n } from '../i18n';
import { useEditorStore } from '../main/store';
import {
  AddBlockContainer,
  AdddBlockHeader,
  RightElement,
  SettingDescription,
  SettingHeader,
  WidgetListContainer,
} from './style';

export const AddBlock = () => {
  const { addBlock, cancelAdding, addBlockData } = useEditorStore((state) => state);

  const addBlockDone = (type: string, addedData: { style?: string; savedBlock?: any }) => {
    addBlock(type, addedData);
  };

  const cancel = () => {
    cancelAdding();
  };

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
        <WidgetList filter={addBlockData?.types} onSelect={addBlockDone} />
      </WidgetListContainer>
    </AddBlockContainer>
  );
};
