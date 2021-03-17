import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromAuth from '@hnc/auth/reducers';
import { select, Store } from '@ngrx/store';
import { NewAccount} from '@hnc/models/user.interface';
import { signup } from '@hnc/auth/actions';

@Component({
  selector: 'hnc-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  name = '';
  email = '';
  password = '';
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromAuth.AuthState>) {
    this.loading$ = store.pipe(select(fromAuth.getSignupPageLoading));
    this.error$ = store.pipe(select(fromAuth.getSignupPageError));
  }

  signUp(credentials: NewAccount): void {
    return this.store.dispatch(signup({ payload: credentials }));
  }
}
