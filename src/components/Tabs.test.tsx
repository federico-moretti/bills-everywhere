import React from 'react';
import { screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { render } from '../testUtils';
import Tabs from './Tabs';

const tabsItems = [
  { id: '1', label: 'First' },
  { id: '2', label: 'Second' },
  { id: '3', label: 'Third' },
  { id: '4', label: 'Forth' },
  { id: '5', label: 'Fifth' },
];

describe('MerchantRow', () => {
  test('Click on Tabs', async () => {
    const onChangeMock = jest.fn();

    render(
      <Tabs
        items={tabsItems.slice(0, 2)}
        labelAccessor={(i) => i.label}
        valueAccessor={(i) => i.id}
        selectedItem={tabsItems[0]}
        onChange={onChangeMock}
      />
    );

    // check that this tab is selected
    const selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab.textContent).toBe(tabsItems[0].label);

    // check that if I click on the unselected tab the onChange action
    // will return the new selected item
    const unselectedTab = screen.getByRole('tab', { selected: false });
    userEvents.click(unselectedTab);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(tabsItems[1]);
  });

  test('Tabs with more items', async () => {
    const onChangeMock = jest.fn();

    render(
      <Tabs
        items={tabsItems}
        labelAccessor={(i) => i.label}
        valueAccessor={(i) => i.id}
        selectedItem={tabsItems[0]}
        onChange={onChangeMock}
      />
    );

    // check that only 1 tab is selected
    const selectedTabs = screen.getAllByRole('tab', { selected: true });
    expect(selectedTabs.length).toBe(1);

    // check that 4 tabs are unselected
    const unselectedTabs = screen.getAllByRole('tab', { selected: false });
    expect(unselectedTabs.length).toBe(4);
  });
});
