import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Favorite } from '@hnc/favorites/models/favorite.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FavoritesService {
  constructor(private firebaseStore: AngularFirestore) {}

  add(userId: string, itemId: number): Promise<Favorite> {
    const timestamp = new Date().getTime();
    return  this.collection(userId)
      .doc(`${itemId}`)
      .set({ timestamp })
      .then(() => ({ itemId, timestamp }));
  }

  remove(userId: string, itemId: number): Promise<void> {
    return this.collection(userId)
      .doc(`${itemId}`)
      .delete();
  }

  list(userId: string): Observable<any> {
    return this.collection(userId)
      .valueChanges()
      .pipe(
        map(value => {
          console.log(value);
          return value;
        })
      );
  }

  private collection(userId: string): AngularFirestoreCollection<any> {
    return this.firebaseStore.collection('favorites')
      .doc(userId)
      .collection('items', ref => ref.orderBy('timestamp', 'desc'));
  }
}
