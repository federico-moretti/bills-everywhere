import { call, put, takeLatest } from '@redux-saga/core/effects';
import { Merchant } from '../types';
import { createApiTypes } from './utils';
import * as apis from '../apis';
import { actionAppLoadingAdd, actionAppLoadingRemove, actionAppErrorAdd } from './app';

// types
const MERCHANTS_GET = createApiTypes('MERCHANTS_GET');

type MerchantsGetSuccessAction = {
  type: typeof MERCHANTS_GET.SUCCESS;
  payload: { merchants: Merchant[] };
};
type MerchantsGetRequestAction = {
  type: typeof MERCHANTS_GET.REQUEST;
};

export const actionMerchantsGet = (): MerchantsGetRequestAction => ({
  type: MERCHANTS_GET.REQUEST,
});

export type MerchantsActions = MerchantsGetSuccessAction | MerchantsGetRequestAction;

// store
type MerchantsStore = {
  items: Merchant[];
};

const initialState: MerchantsStore = {
  items: [],
};

// reducer
export function merchantsReducer(state = initialState, action: MerchantsActions): MerchantsStore {
  switch (action.type) {
    case MERCHANTS_GET.SUCCESS:
      return {
        ...state,
        items: action.payload.merchants,
      };
    default:
      return state;
  }
}

// sagas
function* merchantsGet() {
  try {
    yield put(actionAppLoadingAdd());

    // TS does not infer the yield calls yet
    // so we must define the variable type
    const data: Merchant[] = yield call(apis.merchantsGet);

    yield put<MerchantsGetSuccessAction>({
      type: MERCHANTS_GET.SUCCESS,
      payload: { merchants: data },
    });
    yield put(actionAppLoadingRemove());
  } catch (error) {
    console.log('error:', error);
    yield put(actionAppErrorAdd(error));
    yield put(actionAppLoadingRemove());
  }
}

function* watchMerchantsGet() {
  yield takeLatest(MERCHANTS_GET.REQUEST, merchantsGet);
}

export const merchantsSagas = [watchMerchantsGet];
