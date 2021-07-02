import { call, put, takeLatest } from '@redux-saga/core/effects';
import { Category } from '../types';
import { createApiTypes } from './utils';
import * as apis from '../apis';
import { actionAppLoadingAdd, actionAppLoadingRemove, actionAppErrorAdd } from './app';

// actions
const CATEGORIES_GET = createApiTypes('CATEGORIES_GET');
type CategoriesGetSuccessAction = {
  type: typeof CATEGORIES_GET.SUCCESS;
  payload: { categories: Category[] };
};
type CategoriesGetRequestAction = {
  type: typeof CATEGORIES_GET.REQUEST;
};

export const actionCategoriesGet = (): CategoriesGetRequestAction => ({
  type: CATEGORIES_GET.REQUEST,
});

export type CategoriesActions = CategoriesGetSuccessAction | CategoriesGetRequestAction;

// store
type CategoriesStore = {
  items: Category[];
};

const initialState: CategoriesStore = {
  items: [],
};

// reducer
export function categoriesReducer(
  state = initialState,
  action: CategoriesActions
): CategoriesStore {
  switch (action.type) {
    case CATEGORIES_GET.SUCCESS:
      return {
        ...state,
        items: action.payload.categories,
      };
    default:
      return state;
  }
}

// sagas
function* categoriesGet() {
  try {
    yield put(actionAppLoadingAdd());

    // TS does not infer the yield calls yet
    // so we must define the variable type
    const data: Category[] = yield call(apis.categoriesGet);

    yield put<CategoriesGetSuccessAction>({
      type: CATEGORIES_GET.SUCCESS,
      payload: { categories: data },
    });
    yield put(actionAppLoadingRemove());
  } catch (error) {
    console.log('error:', error);
    yield put(actionAppErrorAdd(error));
    yield put(actionAppLoadingRemove());
  }
}

function* watchCategoriesGet() {
  yield takeLatest(CATEGORIES_GET.REQUEST, categoriesGet);
}

export const categoriesSagas = [watchCategoriesGet];
