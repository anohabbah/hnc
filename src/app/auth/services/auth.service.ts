import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase';

import { EmailPasswordPair, NewAccount } from '@hnc/models/user.interface';

export type LoginProvider = 'google' | 'facebook' | 'twitter' | 'github';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  create({ email, password, name }: NewAccount): Promise<firebase.User | undefined> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result =>
        result.user?.updateProfile({
          displayName: name,
          photoURL: null,
        }).then(() => result.user as firebase.User)
      );
  }

  login({ email, password }: EmailPasswordPair): Promise<firebase.User> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => result.user as firebase.User);
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }
}
