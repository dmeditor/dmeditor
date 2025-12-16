import { useEffect, useState } from 'react';
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

import { dmeConfig, type BrowseImageCallbackParams } from '../config';
import { i18n } from '../i18n';

function CheckImageBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseImage } = callbacks;

  if (browseImage) {
    return browseImage;
  }

  return null;
}

export type ImageChooserProps = {
  visible: boolean;
  value?: BrowseImageCallbackParams;
  multiple?: boolean;
  options?: { showInline?: boolean };
  onConfirm?: (value: BrowseImageCallbackParams, options?: { inline?: boolean }) => void;
  onCancel?: () => void;
};

export const ImageChooser = (props: ImageChooserProps) => {
  const { visible, value, multiple = false, options } = props;
  const BrowseImage = CheckImageBrowserValid();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [localValue, setLocalValue] = useState<BrowseImageCallbackParams>(value ?? []);
  const [inline, setInline] = useState(false);

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
      label: i18n('Browse'),
      element: <BrowseImage value={localValue} onChange={setLocalValue} multiple={multiple} />,
    });
  }

  const handleClose = () => {
    props.onCancel?.();
  };

  const handleConfirm = () => {
    handleClose();
    props.onConfirm?.(localValue, { inline: inline });
  };

  useEffect(() => {
    setLocalValue(value ?? []);
  }, [value]);

  return (
    <Dialog open={!!visible} onClose={handleClose} fullWidth maxWidth="md">
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
        {options && (
          <div>
            {!multiple && options.showInline && (
              <FormControlLabel
                disabled={props.value?.length === 0}
                control={<Checkbox onChange={(e) => setInline(e.target.checked)} />}
                label="Image is inline"
              />
            )}
          </div>
        )}
        <Button onClick={handleClose}>{i18n('Cancel')}</Button>
        <Button onClick={handleConfirm}>{i18n('Confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
};
