import { useEffect, useState } from 'react';
import { Button, TextareaAutosize, TextField } from '@mui/material';

import { DME, useEditorStore } from '../../..';
import { PropertyItem } from '../../../core/utils';
import { CodeEntity } from '../entity';

export function CodeInput(props: DME.SettingComponentProps<CodeEntity>) {
  const {
    block: {
      data: { content },
    },
    blockPath,
  } = props;
  const [value, setValue] = useState(content || '');
  const { updateBlockByPath } = useEditorStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    updateBlockByPath<CodeEntity>(blockPath, (data) => {
      data.content = value;
    });
  };

  useEffect(() => {
    setValue(content || '');
  }, [content]);

  return (
    <PropertyItem label={props.name}>
      <div>
        <TextareaAutosize
          value={value}
          style={{ width: '100%', resize: 'vertical' }}
          onChange={handleChange}
          minRows={8}
        />
      </div>
      <div>
        <Button variant="text" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </PropertyItem>
  );
}
