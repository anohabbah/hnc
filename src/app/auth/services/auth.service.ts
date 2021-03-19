import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { EmailPasswordPair, NewAccount, User } from '@hnc/models/user.interface';

export type LoginProvider = 'google' | 'facebook' | 'twitter' | 'github';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  create({ email, password, name }: NewAccount): Promise<User | undefined> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result =>
        result.user?.updateProfile({
          displayName: name,
          photoURL: null,
        }).then(() => result.user as User)
      );
  }

  login({ email, password }: EmailPasswordPair): Promise<User | undefined> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(({ user: authUser }) => {
        return authUser ? {
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
        } : undefined;
      })
      .catch(err => {
        console.log('failed on login', err);
        throw new Error('something went wrong.');
      });
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }
}
