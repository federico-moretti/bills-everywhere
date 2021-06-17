import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from './testUtils';
import App from './App';

test('renders App', async () => {
  render(<App />);

  await waitFor(() => screen.getByText('Billed:'));
  await waitFor(() => screen.getByText('Not billed:'));
});
