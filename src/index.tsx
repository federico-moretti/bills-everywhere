import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store';
import { Provider as ReduxProvider } from 'react-redux';
import './index.scss';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { baseFontProperties, theme } from './shared/constants';

const store = configureStore();

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${(p) => p.theme.colors.background};
    margin: 0;
    padding: 0;

    ${baseFontProperties}
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
