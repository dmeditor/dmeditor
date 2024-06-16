import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert, AlertColor, Snackbar } from '@mui/material';

import { dmeConfig } from '../config';

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface UseAlertResult {
  showAlert: (message: string, severity?: AlertColor) => void;
  AlertComponent: ReactNode;
}

export const useAlert = (): UseAlertResult => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const [portalRoot, setPortalRoot] = useState<Element | null>(null);

  useEffect(() => {
    let root = document.getElementById('alert-portal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'alert-portal-root';
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  const showAlert = useCallback((message: string, severity: AlertColor = 'info') => {
    setAlert({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const AlertComponent = portalRoot
    ? createPortal(
        <Snackbar
          open={alert.open}
          autoHideDuration={3e3}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{
            zIndex: dmeConfig.editor.zIndex + 1000,
          }}
        >
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>,
        portalRoot,
      )
    : null;

  return {
    showAlert,
    AlertComponent,
  };
};
