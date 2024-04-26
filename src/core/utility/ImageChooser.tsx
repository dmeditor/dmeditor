import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Dialog, DialogActions, DialogContent, Tab, Tabs, TextField } from '@mui/material';

import { dmeConfig, type BrowseImageCallbackParams } from '../config';

function CheckImageBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseImage } = callbacks;

  if (browseImage) {
    return browseImage;
  }

  return null;
}

type ImageChooserProps = {
  visible: boolean;
  value?: BrowseImageCallbackParams;
  multiple?: boolean;
  onConfirm?: (value: BrowseImageCallbackParams) => void;
  onCancel?: () => void;
};

export const ImageChooser = (props: ImageChooserProps) => {
  const { visible, value, multiple = false } = props;
  const BrowseImage = CheckImageBrowserValid();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localValue, setLocalValue] = useState<BrowseImageCallbackParams>(value ?? []);

  const ImageChooseElements: {
    label: string;
    element: JSX.Element;
  }[] = [
    {
      label: 'URL',
      element: (
        <TextField
          label="Image Source"
          value={localValue.map((item) => item.src).join(';') || ''}
          onChange={(e) => setLocalValue([{ src: e.target.value }])}
          fullWidth
        />
      ),
    },
  ];

  if (BrowseImage) {
    ImageChooseElements.splice(0, 0, {
      label: 'Browse',
      element: <BrowseImage value={localValue} onChange={setLocalValue} multiple={multiple} />,
    });
  }

  const handleClose = () => {
    props.onCancel?.();
  };

  const handleConfirm = () => {
    handleClose();
    props.onConfirm?.(localValue);
  };

  useEffect(() => {
    setLocalValue(value ?? []);
  }, [value]);

  return (
    <Dialog open={visible} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <div>
          {ImageChooseElements.length === 1 ? (
            ImageChooseElements[0].element
          ) : (
            <>
              <Tabs value={activeTab} onChange={(_evt, value: number) => setActiveTab(value)}>
                {ImageChooseElements.map((item, index) => (
                  <Tab key={index} label={item.label} />
                ))}
              </Tabs>
              <div
                className={css({
                  padding: '20px',
                })}
              >
                {ImageChooseElements[activeTab].element}
              </div>
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
