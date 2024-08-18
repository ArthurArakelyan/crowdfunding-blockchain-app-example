import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ThirdwebProvider } from 'thirdweb/react';
import { StateContextProvider } from './context';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider>
    <StateContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </StateContextProvider>
  </ThirdwebProvider>
);
