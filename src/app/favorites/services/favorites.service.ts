import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Favorite } from '@hnc/favorites/models/favorite.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FavoritesService {
  private static readonly PARENT_COLLECTION_NAME = 'favorites';
  private static readonly CHILD_COLLECTION_NAME = 'items';
  private collection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection(FavoritesService.PARENT_COLLECTION_NAME);
  }

  add(userId: string, itemId: number): Promise<Favorite> {
    const timestamp = new Date().getTime();
    return this.getUserCollection(userId)
      .doc(`${itemId}`)
      .set({timestamp})
      .then(() => ({itemId, timestamp}));
  }

  remove(userId: string, itemId: number): Promise<void> {
    return this.getUserCollection(userId)
      .doc(`${itemId}`)
      .delete();
  }

  list(userId: string): Observable<Favorite[]> {
    return this.getUserCollection(userId)
      .get().pipe(
        map(snap => snap.docs.map(value => ({
          itemId: Number(value.id),
          timestamp: value.data().timestamp,
        }))));
  }

  private getUserCollection(userId: string): AngularFirestoreCollection<{ timestamp: number }> {
    return this.collection
      .doc(userId)
      .collection<{ timestamp: number }>(FavoritesService.CHILD_COLLECTION_NAME, ref => ref.orderBy('timestamp', 'desc'));
  }
}
