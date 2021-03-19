import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@hnc/auth/reducers';
import {login} from '@hnc/auth/actions';
import {EmailPasswordPair} from '@hnc/models/user.interface';

@Component({
  selector: 'hnc-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromAuth.AuthState>) {
    this.loading$ = store.pipe(select(fromAuth.getLoginPageLoading));
    this.error$ = store.pipe(select(fromAuth.getLoginPageError));
  }

  login(value: EmailPasswordPair): void {
    return this.store.dispatch(login({ payload: value }));
  }
}
