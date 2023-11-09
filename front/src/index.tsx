import React from 'react';
import ReactDOM from 'react-dom/client';
import 'app/styles/index.scss';
import 'app/styles/App.scss';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
