export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface EmailPasswordPair {
  email: string;
  password: string;
}

export interface NewAccount {
  name: string;
  email: string;
  password: string;
}
