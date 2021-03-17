import {Action, createReducer, on} from '@ngrx/store';
import {signup, signupFailure, signupSuccess} from '@hnc/auth/actions';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

const signupReducer = createReducer(
  initialState,
  on(signup, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(signupSuccess, (state) => ({
    ...state,
    error: null,
    loading: false,
  })),
  on(signupFailure, (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return signupReducer(state, action);
}

export const getError = (state: State) => state.error;

export const getLoading = (state: State) => state.loading;
