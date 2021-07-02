// types
const APP_LOADING_ADD = 'APP_LOADING_ADD' as const;
const APP_LOADING_REMOVE = 'APP_LOADING_REMOVE' as const;
type AppLoadingAddAction = { type: typeof APP_LOADING_ADD };
type AppLoadingRemoveAction = { type: typeof APP_LOADING_REMOVE };

export const actionAppLoadingAdd = (): AppLoadingAddAction => ({ type: APP_LOADING_ADD });
export const actionAppLoadingRemove = (): AppLoadingRemoveAction => ({ type: APP_LOADING_REMOVE });

const APP_ERROR_ADD = 'APP_ERROR_ADD' as const;
const APP_ERROR_REMOVE = 'APP_ERROR_REMOVE' as const;
type AppErrorAddAction = { type: typeof APP_ERROR_ADD; payload: { error: string } };
type AppErrorRemoveAction = { type: typeof APP_ERROR_REMOVE };

export const actionAppErrorAdd = (error: string): AppErrorAddAction => ({
  type: APP_ERROR_ADD,
  payload: { error },
});
export const actionAppErrorRemove = (): AppErrorRemoveAction => ({ type: APP_ERROR_REMOVE });

export type AppActions =
  | AppLoadingAddAction
  | AppLoadingRemoveAction
  | AppErrorAddAction
  | AppErrorRemoveAction;

// store
type AppStore = {
  loading: number;
  error?: string;
};

const initialState: AppStore = {
  loading: 0,
  error: undefined,
};

// reducer
export function appReducer(state = initialState, action: AppActions): AppStore {
  switch (action.type) {
    case APP_LOADING_ADD:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case APP_LOADING_REMOVE:
      return {
        ...state,
        loading: state.loading - 1,
      };
    case APP_ERROR_ADD:
      return {
        ...state,
        error: action.payload.error,
      };
    case APP_ERROR_REMOVE:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
}
