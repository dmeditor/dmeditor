import { useState } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { DMEData, i18n, useEditorStore } from '../../..';
import { getWidgetName } from '../../utils';
import { PropertyButton } from '../Property';

export const DeleteBlock = (props: { blockPath: Array<number | string>; block: DMEData.Block }) => {
  const { removeByPath } = useEditorStore();

  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setShowConfirmation(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowConfirmation(true)}
        variant="outlined"
        color="warning"
        title="Delete"
      >
        <DeleteOutline /> {i18n('Delete')}
      </Button>

      {showConfirmation && (
        <Dialog open={true} onClose={() => setShowConfirmation(false)}>
          <DialogTitle>{i18n('Delete confirmation')}</DialogTitle>
          <DialogContent>
            {i18n('Are you sure to delete')} <b>{getWidgetName(props.block.type)}</b>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmation(false)}> {i18n('Cancel')}</Button>
            <Button onClick={handleDelete}>
              <DeleteOutline />
              {i18n('Confirm')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
