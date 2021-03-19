import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '@hnc/auth/services/auth.service';
import {
  login,
  loginFailure,
  loginRedirect,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  signup,
  signupFailure,
  signupSuccess,
} from '@hnc/auth/actions/index';
import { EmailPasswordPair, NewAccount } from '@hnc/models/user.interface';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { clear, load } from '@hnc/favorites/actions/favorites.action';

@Injectable()
export class AuthEffects {
  login$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(login),
    map((action) => action.payload),
    mergeMap((pair: EmailPasswordPair) =>
      from(this.authService.login(pair))
        .pipe(
          mergeMap(user => {
            console.log('passed user', user);
            return of<Action>(
              loginSuccess({ payload: user }),
              load(),
            );
          }),
          catchError(error => of(loginFailure({ payload: error })))
        )
    )
  ));

  signup$ = createEffect(() => this.action$.pipe(
    ofType(signup),
    map((action) => action.payload),
    mergeMap((user: NewAccount) =>
      from(this.authService.create(user))
        .pipe(
          mergeMap(createdUser => of<Action>(
            signupSuccess(),
            loginSuccess({ payload: createdUser })
          )),
          catchError(error => of(signupFailure({ payload: error })))
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
      tap(() => this.router.navigate(['/login']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() => this.action$.pipe(
    ofType(logout),
    mergeMap(() =>
      from(this.authService.logout())
        .pipe(
          mergeMap(() => of<Action>(logoutSuccess(), clear())),
          catchError(error => of(logoutFailure({ payload: error })))
        )
    )
  ));

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
