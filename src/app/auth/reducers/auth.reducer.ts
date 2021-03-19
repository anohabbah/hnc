import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@hnc/models/user.interface';
import * as AuthActions from '../actions';

export interface State {
  loggedIn: boolean;
  user: User | null | undefined;
  logoutError: any;
}

export const initialState: State = {
  loggedIn: false, user: null, logoutError: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { payload }) => ({
    ...state,
    loggedIn: true,
    user: payload,
    logoutError: null,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.loginFailure, (state, { payload }) => ({
    ...state,
    logoutError: payload,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const getLoggedIn = (state: State) => state.loggedIn;

export const getUser = (state: State) => state.user;
