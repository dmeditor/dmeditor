import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { css } from '@emotion/css';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';

import { dmeConfig, type BrowseLinkCallbackParams } from '../config';

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
  showOpenNew?: boolean;
  urlOnly?: boolean; //show only url tab or all tabs
}

export const LinkChooser = forwardRef<LinkRef, LinkChooserProps>((props, ref) => {
  const { defaultVisible, value, showOpenNew, urlOnly } = props;
  const BrowseLink = CheckBrowserValid();
  const [visible, setVisible] = useState(defaultVisible);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localValue, setLocalValue] = useState<BrowseLinkCallbackParams>(value || { link: '' });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue({ ...localValue, link: newValue });
  };

  const renderOpenNew = () => {
    return showOpenNew ? (
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              if (typeof localValue === 'object') {
                setLocalValue({ ...localValue, openNew: e.target.checked });
              }
            }}
            defaultChecked={typeof value === 'object' ? value.openNew : false}
          />
        }
        label="Open in new tab"
      />
    ) : (
      <></>
    );
  };

  const ChooseElements: {
    label: string;
    element: JSX.Element;
  }[] = [
    {
      label: 'Link',
      element: (
        <div>
          <TextField
            label="Link"
            value={localValue.link || ''}
            onChange={handleTextChange}
            fullWidth
          />
          {renderOpenNew()}
        </div>
      ),
    },
  ];

  if (BrowseLink && !urlOnly) {
    ChooseElements.splice(0, 0, {
      label: 'Browse',
      element: (
        <>
          <BrowseLink value={localValue} onChange={setLocalValue} />
          {renderOpenNew()}
        </>
      ),
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
    setLocalValue(value ?? { link: '' });
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
