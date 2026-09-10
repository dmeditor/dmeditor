import { useState } from 'react';
import { CloseOutlined, HelpOutlineOutlined, OpenInNew } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { dmeI18n, i18n } from '../../../..';
import type { DME } from '../../../..';

const resolveHelpLink = (link?: Record<string, string>): string => {
  if (!link) {
    return '';
  }

  const language = dmeI18n.language;
  return link[language] || link['default'] || '';
};

// since version 1.0.4
const HelpLink = (props: DME.SettingComponentProps) => {
  const { name, parameters } = props;
  const openIn = (parameters?.openIn as string) || 'link';
  const showAs = (parameters?.showAs as string) || 'text';
  const url = resolveHelpLink(parameters?.link as Record<string, string> | undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!url) {
      return;
    }
    if (openIn === 'popup') {
      setOpen(true);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: 5 }}>
      <Button
        size="small"
        fullWidth
        variant={showAs === 'button' ? 'outlined' : 'text'}
        sx={showAs === 'button' ? { backgroundColor: '#ffffff' } : undefined}
        disabled={!url}
        onClick={handleOpen}
        startIcon={openIn === 'popup' ? <HelpOutlineOutlined fontSize="small" /> : undefined}
        endIcon={openIn === 'popup' ? undefined : <OpenInNew fontSize="small" />}
      >
        {name || i18n('Help')}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {name || i18n('Help')}
          <IconButton size="small" onClick={() => setOpen(false)} aria-label={i18n('Close')}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 0, height: '70vh' }}>
          {url && (
            <iframe
              src={url}
              title={name || i18n('Help')}
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpLink;
