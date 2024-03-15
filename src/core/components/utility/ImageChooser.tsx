import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
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

export type ImageRef = {
  open: () => void;
};

type ImageChooserProps = {
  defaultVisible: boolean;
  value?: BrowseImageCallbackParams;
  onConfirm?: (value: BrowseImageCallbackParams) => void;
};

export const ImageChooser = forwardRef<ImageRef, ImageChooserProps>((props, ref) => {
  const { defaultVisible, value } = props;
  const [visible, setVisible] = useState<boolean>(defaultVisible);
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
      element: <BrowseImage value={localValue} onChange={setLocalValue} />,
    });
  }

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    handleClose();
    props.onConfirm?.(localValue);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setVisible(true);
      },
    }),
    [],
  );

  useEffect(() => {
    setLocalValue(value ?? []);
  }, [value]);

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
});
