import React from 'react';
import { Dispatch } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { all, fork } from 'redux-saga/effects';
import {
  MerchantsActions,
  merchantsSagas,
  merchantsReducer,
  actionMerchantsGet,
  actionMerchantsPatch,
} from './merchants';
import { AppActions, appReducer } from './app';
import {
  CategoriesActions,
  categoriesSagas,
  categoriesReducer,
  actionCategoriesGet,
} from './categories';
export * from './selectors';

const rootReducer = combineReducers({
  merchants: merchantsReducer,
  app: appReducer,
  categories: categoriesReducer,
});

// https://redux-saga.js.org/docs/advanced/RootSaga.html
function* root() {
  yield all([...merchantsSagas, ...categoriesSagas].map((s) => fork(s)));
}

const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(root);
  return store;
}

// exports dispatch with types
type ActionTypes = AppActions | MerchantsActions | CategoriesActions;
export function useAppDispatch() {
  return useDispatch<Dispatch<ActionTypes>>();
}

const actions = { actionMerchantsGet, actionMerchantsPatch, actionCategoriesGet };
export function useAppActions() {
  const dispatch = useDispatch();
  return React.useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
}

// exports selector with types
export type Store = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
