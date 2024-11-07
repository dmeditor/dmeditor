import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { DeleteOutline, MailOutline, PhoneOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
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

  const linkTypes = { email: 'mailto:', phone: 'tel:', http: 'http://', https: 'https://' };
  const currentLinkType = useMemo(() => {
    const link = localValue.link;
    let result = '';
    for (const key of Object.keys(linkTypes)) {
      const prefix = (linkTypes as any)[key];
      if (link.startsWith(prefix)) {
        result = key;
        break;
      }
    }
    return result;
  }, [localValue.link]);

  const addUpdatePrefix = (prefixType: 'email' | 'phone' | 'http' | 'https') => {
    const prefix = linkTypes[prefixType];
    if (localValue.link.startsWith(prefix)) {
      setLocalValue({ ...localValue, link: localValue.link.substring(prefix.length) });
    } else {
      if (currentLinkType) {
        const v = localValue.link.substring((linkTypes as any)[currentLinkType].length);
        setLocalValue({ ...localValue, link: prefix + v });
      } else {
        setLocalValue({ ...localValue, link: prefix + localValue.link });
      }
    }
  };

  const empty = () => {
    setLocalValue({ ...localValue, link: '' });
  };

  const ChooseElements: {
    label: string;
    element: JSX.Element;
  }[] = [
    {
      label: 'Link',
      element: (
        <div>
          <Box sx={{ display: 'flex' }}>
            <TextField
              size="small"
              label="URL"
              InputLabelProps={{ shrink: true }}
              value={localValue.link || ''}
              fullWidth
              onChange={handleTextChange}
            />
            <IconButton size="small" title="Empty" onClick={() => empty()}>
              <DeleteOutline />
            </IconButton>
          </Box>
          <div>
            <Box sx={{ mt: 2 }}>
              <label>Link help: </label>
              <Button
                size="small"
                title="Email"
                color={currentLinkType === 'https' ? 'info' : 'inherit'}
                onClick={() => addUpdatePrefix('https')}
              >
                https
              </Button>
              <Button
                size="small"
                title="Http"
                color={currentLinkType === 'http' ? 'info' : 'inherit'}
                onClick={() => addUpdatePrefix('http')}
              >
                http
              </Button>
              <Button
                size="small"
                title="Email"
                color={currentLinkType === 'email' ? 'info' : 'inherit'}
                onClick={() => addUpdatePrefix('email')}
              >
                <MailOutline />
              </Button>
              <Button
                size="small"
                title="Telephone"
                color={currentLinkType === 'phone' ? 'info' : 'inherit'}
                onClick={() => addUpdatePrefix('phone')}
              >
                <PhoneOutlined />
              </Button>
            </Box>
          </div>
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
