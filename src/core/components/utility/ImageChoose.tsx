import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Dialog, DialogActions, DialogContent, Tab, Tabs, TextField } from '@mui/material';
import { BrowseImageCallbackParams, dmeConfig, ImageInfo } from 'dmeditor/config';

function CheckImageBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseImage } = callbacks;

  if (browseImage) {
    return browseImage;
  }

  return null;
}

export const ImageChoose = (props: {
  visible: boolean;
  defaultValue?: BrowseImageCallbackParams;
  onCancel?: () => void;
  onConfirm?: (value: BrowseImageCallbackParams) => void;
}) => {
  const { visible, defaultValue } = props;
  const BrowseImage = CheckImageBrowserValid();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [value, setValue] = useState<BrowseImageCallbackParams>([]);

  const ImageChooseElements: {
    label: string;
    element: JSX.Element;
  }[] = [
    {
      label: 'URL',
      element: (
        <TextField
          label="Image Source"
          value={value.map((item) => item.src).join(';') || ''}
          onChange={(e) => setValue([{ src: e.target.value }])}
          fullWidth
        />
      ),
    },
  ];

  if (BrowseImage) {
    ImageChooseElements.splice(0, 0, {
      label: 'Browse',
      element: <BrowseImage value={value} onChange={setValue} />,
    });
  }

  const handleClose = () => {
    props.onCancel?.();
  };

  const handleConfirm = () => {
    handleClose();
    props.onConfirm?.(value);
  };

  return (
    <Dialog open={visible} onClose={handleClose} fullWidth>
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
