import React from 'react';
import { Store, useAppDispatch, useAppSelector } from './store';
import { actionMerchantsGet } from './store/merchants';
import { createSelector } from 'reselect';

const billedMerchantsSelector = createSelector(
  (state: Store) => state.merchants.items,
  (merchants) => merchants.filter((m) => m.isBill)
);
const notBilledMerchantsSelector = createSelector(
  (state: Store) => state.merchants.items,
  (merchants) => merchants.filter((m) => !m.isBill)
);

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const isAppLoading = useAppSelector((state) => state.app.loading);
  const isAppError = useAppSelector((state) => state.app.error);

  const billedMerchants = useAppSelector(billedMerchantsSelector);
  const notBilledMerchants = useAppSelector(notBilledMerchantsSelector);

  React.useEffect(() => {
    dispatch(actionMerchantsGet());
  }, [dispatch]);

  if (isAppLoading > 0) return <div>Loading...</div>;
  if (isAppError) return <div>Error: {isAppError.toString()}</div>;

  return (
    <section>
      <p>Billed:</p>
      <ul>
        {billedMerchants.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
      <p>Not billed:</p>
      <ul>
        {notBilledMerchants.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default App;
