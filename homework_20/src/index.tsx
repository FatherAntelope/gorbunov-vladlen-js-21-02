import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ThemeDarkContextProvider } from './contexts/theme-checkbox/ThemeCheckboxContext';
// import './index.css';
import 'antd/dist/antd.css';
import App from './components/app/App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeDarkContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeDarkContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
