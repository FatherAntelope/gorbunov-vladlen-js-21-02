import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeDarkContextProvider } from './contexts/theme-checkbox/ThemeCheckboxContext';
// import './index.css';
import 'antd/dist/antd.css';
import App from './components/app/App';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeDarkContextProvider>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </ThemeDarkContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
