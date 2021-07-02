import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import { theme } from './shared/constants';

const store = configureStore();

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
