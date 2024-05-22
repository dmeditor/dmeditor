import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { DME, useEditorStore } from '../../..';
import { PropertyItem } from '../../../core/utils';
import { CodeEntity } from '../entity';

export function CodeInput(props: DME.SettingComponentProps<CodeEntity>) {
  const {
    block: {
      data: { content },
    },
  } = props;
  const [value, setValue] = useState(content || '');
  const { updateSelectedBlock } = useEditorStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    updateSelectedBlock<CodeEntity>((data) => {
      data.content = value;
    });
  };

  useEffect(() => {
    setValue(content || '');
  }, [content]);

  return (
    <PropertyItem label={props.name}>
      <TextField value={value} onChange={handleChange} multiline rows={6} />
      <Button variant="text" onClick={handleUpdate}>
        Update
      </Button>
    </PropertyItem>
  );
}
