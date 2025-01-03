import { DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const DeleteBlock = (props: { blockPath: Array<number | string> }) => {
  const { removeByPath } = useEditorStore();

  const handleDelete = () => {
    const length = props.blockPath.length;
    const lastIndex = props.blockPath[length - 1];
    if (typeof lastIndex === 'number') {
      removeByPath(props.blockPath);
    } else {
      if (length >= 2) {
        const parentPath = [...props.blockPath].slice(0, -1);
        removeByPath(parentPath);
      }
    }
  };

  return (
    <Button onClick={handleDelete} variant="outlined" color="warning" title="Delete">
      <DeleteOutline /> Delete
    </Button>
  );
};
