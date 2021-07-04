import { call, put, takeLatest } from '@redux-saga/core/effects';
import { Merchant } from '../types';
import { createApiTypes } from './utils';
import * as apis from '../apis';
import { actionAppLoadingAdd, actionAppLoadingRemove, actionAppErrorAdd } from './app';

// merchants get action
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

// merchants patch action
const MERCHANTS_PATCH = createApiTypes('MERCHANTS_PATCH');
type MerchantsPatchRequestAction = {
  type: typeof MERCHANTS_PATCH.REQUEST;
  payload: Partial<Merchant> & { id: string };
};

export const actionMerchantsPatch = (
  merchant: Partial<Merchant> & { id: string }
): MerchantsPatchRequestAction => ({
  type: MERCHANTS_PATCH.REQUEST,
  payload: merchant,
});

export type MerchantsActions =
  | MerchantsGetSuccessAction
  | MerchantsGetRequestAction
  | MerchantsPatchRequestAction;

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
  yield takeLatest<MerchantsGetRequestAction>(MERCHANTS_GET.REQUEST, merchantsGet);
}

function* merchantsPatch({ payload }: MerchantsPatchRequestAction) {
  try {
    yield put(actionAppLoadingAdd());

    yield call(apis.merchantsPatch, payload.id, payload);
    yield merchantsGet(); // refresh merchants from db

    yield put(actionAppLoadingRemove());
  } catch (error) {
    console.log('error:', error);
    yield put(actionAppErrorAdd(error));
    yield put(actionAppLoadingRemove());
  }
}

function* watchMerchantsPatch() {
  yield takeLatest<MerchantsPatchRequestAction>(MERCHANTS_PATCH.REQUEST, merchantsPatch);
}

export const merchantsSagas = [watchMerchantsGet, watchMerchantsPatch];
