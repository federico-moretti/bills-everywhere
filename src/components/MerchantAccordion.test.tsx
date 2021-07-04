import React from 'react';
import { screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { render } from '../testUtils';
import MerchantAccordion from './MerchantAccordion';
import { Merchant } from '../types';

const merchant: Merchant = {
  categoryId: 1,
  iconUrl: 'https://pbs.twimg.com/profile_images/1151788824093188097/wHfb5mYZ_bigger.png',
  id: '5a5caa1efe33900100fd8ed5',
  isBill: true,
  name: 'Vodafone',
  transactions: [
    { amount: 12.34, date: '2018-01-13', id: 36 },
    { amount: 14.34, date: '2018-02-13', id: 37 },
    { amount: 15.54, date: '2018-03-13', id: 38 },
    { amount: 11.34, date: '2018-04-13', id: 39 },
    { amount: 18.99, date: '2018-05-13', id: 40 },
  ],
};

describe('MerchantAccordion', () => {
  test('Click on MerchantAccordion', async () => {
    render(<MerchantAccordion merchant={merchant} />);

    // check row header
    const row = screen.getByText(merchant.name);
    screen.getByText(`Transactions count: ${merchant.transactions.length}`);

    // check if row open correctly
    userEvents.click(row);
    screen.getByText(/12.34€/);
    const transactions = await screen.findAllByTestId('transaction');
    expect(transactions.length).toBe(merchant.transactions.length);
  });
});
