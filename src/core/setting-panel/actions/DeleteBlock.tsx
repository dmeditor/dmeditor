import { DeleteOutline } from '@mui/icons-material';

import { useEditorStore } from '../../..';
import { PropertyButton } from '../Property';

export const DeleteBlock = (props: { blockPath: Array<number> }) => {
  const { removeByPath } = useEditorStore();

  const handleDelete = () => {
    removeByPath(props.blockPath);
  };

  return (
    <PropertyButton onClick={handleDelete} variant="outlined" color="warning" title="Delete">
      <DeleteOutline /> Delete
    </PropertyButton>
  );
};
