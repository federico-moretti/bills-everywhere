import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../testUtils';
import Loader from './Loader';

describe('Loader', () => {
  test('Loader loading', async () => {
    render(<Loader loading={true} />);
    screen.getByRole('progressbar');
  });

  test('Loader not loading', async () => {
    render(<Loader loading={false} />);
    const loader = screen.queryByRole('progressbar');
    expect(loader).toBeNull();
  });
});
