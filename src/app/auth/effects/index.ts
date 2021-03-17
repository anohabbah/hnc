import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService, LoginProvider } from '../services/auth.service';
import {
  login,
  loginFailure,
  loginSuccess,
  loginWithProvider,
  logoutFailure,
  logoutSuccess,
  signup,
  signupFailure,
  signupSuccess,
  loginRedirect,
  logout,
} from '../actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EmailPasswordPair, NewAccount } from '@hnc/models/user.interface';
import {from, Observable, of} from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(login),
    map((action) => action.payload),
    mergeMap((pair: EmailPasswordPair) =>
      from(this.authService.login(pair))
        .pipe(
          mergeMap(user => of<Action>(loginSuccess({ payload: user }))),
          catchError(error => of(loginFailure({ payload: error })))
        )
    )
  ));

  // loginWithProvider$ = createEffect(() => this.action$.pipe(
  //   ofType(loginWithProvider),
  //   map((action) => action.payload),
  //   mergeMap((provider: LoginProvider) =>
  //     from(this.authService.logInWithProvider(provider))
  //       .pipe(
  //         mergeMap(user => of<Action>(loginSuccess({payload: user}))),
  //         catchError(error => of(loginFailure({payload: error})))
  //       )
  //   )
  // ));

  signup$ = createEffect(() => this.action$.pipe(
    ofType(signup),
    map((action) => action.payload),
    mergeMap((user: NewAccount) =>
      from(this.authService.create(user))
        .pipe(
          mergeMap(createdUser => of<Action>(signupSuccess(), loginSuccess({payload: createdUser}))),
          catchError(error => of(signupFailure(error)))
        )
    )
  ));

  loginSuccess$ = createEffect(
    () => this.action$.pipe(
      ofType(loginSuccess),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(
    () => this.action$.pipe(
      ofType(logoutSuccess),
      tap(() => this.router.navigate(['/']))
    ),
      { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => this.action$.pipe(
    ofType(loginRedirect, logout),
    tap(() => {
      this.router.navigate(['/login']);
    })
  ),
{ dispatch: false }
);

  logout$ = createEffect(() => this.action$.pipe(
    ofType(logout),
    mergeMap(() =>
      from(this.authService.logout())
        .pipe(
          mergeMap(() => of<Action>(logoutSuccess())),
          catchError(error => of(logoutFailure({payload: error})))
        )
    )
  ));
}
