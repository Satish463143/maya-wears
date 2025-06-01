import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux'
import storeConfig from './config/store.config.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Provider store={storeConfig}>
        <App />
      </Provider>  
    </BrowserRouter>
  </StrictMode>
);  