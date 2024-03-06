import { DeleteOutline } from '@mui/icons-material';
import { useEditorStore } from 'dmeditor/main/store';

import { PropertyButton } from '../Property';

export const DeleteBlock = () => {
  const {
    selected: { currentListPath, blockIndex },
    removeByPath,
  } = useEditorStore();

  const handleDelete = () => {
    removeByPath([...currentListPath, blockIndex]);
  };

  return (
    <PropertyButton onClick={handleDelete} variant="outlined" color="warning" title="Delete">
      <DeleteOutline /> Delete
    </PropertyButton>
  );
};
