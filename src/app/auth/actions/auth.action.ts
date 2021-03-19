import { createAction, props } from '@ngrx/store';
import { EmailPasswordPair, NewAccount, User } from '@hnc/models/user.interface';
import { LoginProvider } from '@hnc/auth/services/auth.service';

export const enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginWithProvider = '[Auth] Login With Provider',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Signup = '[Auth] Sign Up',
  SignupSuccess = '[Auth] SignUp Success',
  SignupFailure = '[Auth] SignUp Failure',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFailure = '[Auth] Logout Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ payload: EmailPasswordPair }>()
);

export const loginWithProvider = createAction(
  AuthActionTypes.LoginWithProvider,
  props<{ payload: LoginProvider }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ payload: User | undefined }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFailure,
  props<{ payload: any }>()
);

export const signup = createAction(
  AuthActionTypes.Signup,
  props<{ payload: NewAccount }>()
);

export const signupSuccess = createAction(AuthActionTypes.SignupSuccess);

export const signupFailure = createAction(
  AuthActionTypes.SignupFailure,
  props<{ payload: any }>()
);

export const logout = createAction(AuthActionTypes.Logout);

export const logoutSuccess = createAction(AuthActionTypes.LogoutSuccess);

export const logoutFailure = createAction(
  AuthActionTypes.LogoutFailure,
  props<{ payload: any }>()
);

export const loginRedirect = createAction(AuthActionTypes.LoginRedirect);
