import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import firebase from 'firebase';

import {EmailPasswordPair, NewAccount} from '@hnc/models/user.interface';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  create({ email, password }: NewAccount): Promise<firebase.User> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => result.user as firebase.User);
  }

  login({ email, password }: EmailPasswordPair): Promise<firebase.User> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => result.user as firebase.User);
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }
}
