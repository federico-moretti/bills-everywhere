import { createSelector } from 'reselect';
import { Store } from '.';

const billedMerchantsSelector = createSelector(
  (s: Store) => s.merchants.items,
  (merchants) => merchants.filter((m) => m.isBill)
);

const notBilledMerchantsSelector = createSelector(
  (s: Store) => s.merchants.items,
  (merchants) => merchants.filter((m) => !m.isBill)
);

export { billedMerchantsSelector, notBilledMerchantsSelector };
