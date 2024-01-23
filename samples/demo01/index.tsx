import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App';
import { getBlockByID, getChildList } from '../../src/core/main/store/operations';
import { DMEData } from '../../src/core/components/types/blocktype';


const renderApp = () => {
  const $el = document.getElementById('dmeditor');
  const app = (
    <React.StrictMode>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  createRoot($el!).render(app);
};

renderApp();

export default renderApp;
