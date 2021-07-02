import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render } from './testUtils';
import { baseUrl } from './apis';
import db from '../db.test.json';
import App from './App';

const server = setupServer(
  rest.get(`${baseUrl}/merchants`, (_, res, ctx) => {
    return res(ctx.json(db.merchants));
  }),
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(db.categories));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('App', () => {
  test('Renders App', async () => {
    render(<App />);
    // check if the app renders correctly
    screen.getByRole('progressbar');
    screen.getByText('Bills');
    screen.getByText('Potential bills');
  });

  test('Click on tabs', async () => {
    render(<App />);
    screen.queryByRole('progressbar');

    // check if a merchant marked with isBill === true exists
    await waitFor(() => screen.getAllByText('Vodafone'));

    // click on tab then check if a merchant marked with isBill === false exists
    const button = screen.getByText('Potential bills');
    userEvents.click(button);
    await waitFor(() => screen.getAllByText('Sky TV'));
  });
});
