import {Inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs';
import { map, mergeMap, take, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as ItemActions from '@hnc/actions/item.action';
import { Item, Items } from '@hnc/models/item.interface';
import {HACKER_NEWS_DB} from '@hnc/hackernews-db.token';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {}

  loadItems$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.load),
    map(({ payload }) => payload),
    mergeMap(
      (ids: number[]) =>
        combineLatest(
          ids.map(id => this.db.object<Item>('/v0/item/' + id)
            .valueChanges()
            .pipe(take(1))
          )
        ) as Observable<Items>
    ),
    map((items: Items) => ItemActions.loadSuccess({ payload: items })),
    catchError(err => of(ItemActions.loadFail({ payload: err })))
  ));
}
