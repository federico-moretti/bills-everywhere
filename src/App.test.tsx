import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { rest, RestRequest } from 'msw';
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
  }),
  rest.patch(
    `${baseUrl}/merchants/:merchantId`,
    (req: RestRequest<{ id: string; isBill: boolean }>, res, ctx) => {
      const newMerchant = db.merchants.find((m) => m.id === req.body.id);
      return res(ctx.json(newMerchant));
    }
  )
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

  test('Remove bill', async () => {
    render(<App />);
    screen.queryByRole('progressbar');

    // click on remove bill button
    const button = await waitFor(() => screen.getByTitle('Remove bill - Vodafone'));
    userEvents.click(button);

    // check loading
    screen.queryByRole('progressbar');
  });

  test('Add as bill', async () => {
    render(<App />);
    screen.queryByRole('progressbar');

    // click on add bill button
    const tabButton = screen.getByText('Potential bills');
    userEvents.click(tabButton);
    const addButton = await waitFor(() => screen.getByTitle('Add as bill - Sky TV'));
    userEvents.click(addButton);

    // check loading
    screen.queryByRole('progressbar');
  });
});
