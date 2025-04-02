import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const baseName = import.meta.env.BASE_URL;
console.log('ACTUAL BASENAME USED:', baseName);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);