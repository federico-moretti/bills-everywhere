import React from 'react';
import styled from 'styled-components';
import {
  useAppActions,
  useAppSelector,
  billedMerchantsSelector,
  notBilledMerchantsSelector,
} from './store';
import Tabs from './components/Tabs';
import MerchantAccordion from './components/MerchantAccordion';
import Loader from './components/Loader';

const TitleStyled = styled.h1`
  color: ${(p) => p.theme.colors.accent400};
  text-align: center;
  margin: 0;
  padding: 20px;
`;

const ListStyled = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const AppStyled = styled.section`
  margin: 0 10px;

  ${(p) => p.theme.mediaQueries.md} {
    margin: 0 30px;
  }
`;

const tabs = [
  { key: 'billed', label: 'Bills' },
  { key: 'notBilled', label: 'Potential bills' },
];

function App() {
  const actions = useAppActions();

  const isAppError = useAppSelector((s) => s.app.error);
  const isAppLoading = useAppSelector((s) => s.app.loading);

  const billedMerchants = useAppSelector(billedMerchantsSelector);
  const notBilledMerchants = useAppSelector(notBilledMerchantsSelector);

  React.useEffect(() => {
    actions.actionMerchantsGet();
    actions.actionCategoriesGet();
  }, [actions]);

  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

  if (isAppError) return <div>Error: {isAppError.toString()}</div>;

  return (
    <>
      <Loader loading={isAppLoading > 0} />
      <AppStyled>
        <TitleStyled>Bills. Bills everywhere.</TitleStyled>
        <Tabs
          items={tabs}
          selectedItem={selectedTab}
          valueAccessor={(i) => i.key}
          labelAccessor={(i) => i.label}
          onChange={setSelectedTab}
          style={{ marginBottom: 20 }}
        />
        {selectedTab.key === 'billed' && (
          <ListStyled>
            {billedMerchants.map((m) => (
              <MerchantAccordion key={m.id} merchant={m} />
            ))}
          </ListStyled>
        )}
        {selectedTab.key === 'notBilled' && (
          <ListStyled>
            {notBilledMerchants.map((m) => (
              <MerchantAccordion key={m.id} merchant={m} />
            ))}
          </ListStyled>
        )}
      </AppStyled>
    </>
  );
}

export default App;
