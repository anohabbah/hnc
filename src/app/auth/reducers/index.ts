import * as fromAuth from '@hnc/auth/reducers/auth.reducer';
import * as fromLogin from '@hnc/auth/reducers/login.reducer';
import * as fromSignup from '@hnc/auth/reducers/signup.reducer';
import * as fromRoot from '@hnc/reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export const stateFeatureKey = 'auth';

export interface AuthState {
  auth: fromAuth.State;
  login: fromLogin.State;
  signup: fromSignup.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer,
  login: fromLogin.reducer,
  signup: fromSignup.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>(stateFeatureKey);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.login
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLogin.getError
);

export const getLoginPageLoading = createSelector(
  selectLoginPageState,
  fromLogin.getLoading
);

export const getSignupPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signup
);

export const getSignupPageLoading = createSelector(
  getSignupPageState,
  fromSignup.getLoading
);

export const getSignupPageError = createSelector(
  getSignupPageState,
  fromSignup.getError
);
