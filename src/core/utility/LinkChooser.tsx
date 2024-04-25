import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Dialog, DialogActions, DialogContent, Tab, Tabs, TextField } from '@mui/material';
import { BrowseLinkCallbackParams, dmeConfig } from 'dmeditor/config';

function CheckBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseLink } = callbacks;

  if (browseLink) {
    return browseLink;
  }

  return null;
}

export type LinkRef = {
  open: () => void;
};
interface LinkChooserProps {
  defaultVisible: boolean;
  value?: BrowseLinkCallbackParams;
  onConfirm?: (value: BrowseLinkCallbackParams) => void;
}

export const LinkChooser = forwardRef<LinkRef, LinkChooserProps>((props, ref) => {
  const { defaultVisible, value } = props;
  const BrowseLink = CheckBrowserValid();
  const [visible, setVisible] = useState(defaultVisible);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localValue, setLocalValue] = useState<BrowseLinkCallbackParams>(value ?? '');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  };

  const ChooseElements: {
    label: string;
    element: JSX.Element;
  }[] = [
    {
      label: 'Link',
      element: (
        <div>
          <TextField label="Link" value={localValue || ''} onChange={handleTextChange} fullWidth />
        </div>
      ),
    },
  ];

  if (BrowseLink) {
    ChooseElements.splice(0, 0, {
      label: 'Browse',
      element: <BrowseLink value={localValue} onChange={setLocalValue} />,
    });
  }

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    handleClose();
    props.onConfirm?.(localValue);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
  }));

  useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  return (
    <Dialog open={visible} onClose={handleClose} fullWidth>
      <DialogContent>
        <div>
          {ChooseElements.length === 1 ? (
            ChooseElements[0].element
          ) : (
            <>
              <Tabs value={activeTab} onChange={(_evt, value: number) => setActiveTab(value)}>
                {ChooseElements.map((item, index) => (
                  <Tab key={index} label={item.label} />
                ))}
              </Tabs>
              <div
                className={css({
                  padding: '20px',
                })}
              >
                {ChooseElements[activeTab].element}
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
