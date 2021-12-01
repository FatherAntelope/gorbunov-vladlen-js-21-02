import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './store';
import 'antd/dist/antd.css';
import App from './components/app/App';
import { ThemeCheckboxContextProvider } from './contexts/theme-checkbox/ThemeCheckboxContext';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <ThemeCheckboxContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeCheckboxContextProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
