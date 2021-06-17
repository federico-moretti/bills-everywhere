import { Dispatch } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { MerchantsActions, merchantsSagas, merchantsReducer } from './merchants';
import { AppActions, appReducer } from './app';

const rootReducer = combineReducers({ merchants: merchantsReducer, app: appReducer });

// https://redux-saga.js.org/docs/advanced/RootSaga.html
function* root() {
  // yield spawn(watchMerchantsGet);
  yield all([...merchantsSagas].map((s) => fork(s)));
}

const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(root);
  return store;
}

// exports dispatch with types
type ActionTypes = AppActions | MerchantsActions;
export function useAppDispatch() {
  return useDispatch<Dispatch<ActionTypes>>();
}

// exports selector with types
export type Store = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
