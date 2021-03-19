import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess } from '@hnc/auth/actions';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

const loginReducer: ActionReducer<State> = createReducer(
  initialState,
  on(login, (state) => ({ ...state, error: null, loading: true })),
  on(loginSuccess, (state) => {
    console.log('login succeed');
    return ({
      ...state,
      error: null,
      loading: false,
    });
  }),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return loginReducer(state, action);
}

export const getError = (state: State) => state.error;

export const getLoading = (state: State) => state.loading;
