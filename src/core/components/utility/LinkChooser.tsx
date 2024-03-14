import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { BrowseLinkCallbackParams, dmeConfig, LinkInfo } from 'dmeditor/config';

function CheckBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseLink } = callbacks;

  if (browseLink) {
    return browseLink;
  }

  return null;
}

export const LinkChooser = (props: {
  visible: boolean;
  value?: BrowseLinkCallbackParams;
  onCancel?: () => void;
  onConfirm?: (value: BrowseLinkCallbackParams) => void;
}) => {
  const { visible, value } = props;
  const BrowseLink = CheckBrowserValid();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localValue, setLocalValue] = useState<BrowseLinkCallbackParams>(value ?? []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue((val) => [{ ...val[0], href: newValue }]);
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
            value={localValue?.[0].href || ''}
            onChange={handleTextChange}
            fullWidth
          />
          <div className={css({ marginTop: 10 })}>
            <TextField
              label="Text"
              value={localValue?.[0].text || ''}
              onChange={(e) => {
                setLocalValue((val) => [{ ...val[0], text: e.target.value }]);
              }}
              fullWidth
            />
          </div>
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
};
