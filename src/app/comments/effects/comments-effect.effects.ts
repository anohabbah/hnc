import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';

import * as fromComments from '../reducers';
import * as CommentActions from '../actions';
import * as ItemsActions from '@hnc/actions/item.action';
import { Item } from '@hnc/models/item.interface';
import { pageSize } from '@hnc/comments/reducers/pagination.reducer';

@Injectable()
export class CommentsEffectEffects {
  loadComment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CommentActions.select),
    map(({ payload }) => payload),
    switchMap((selectedItemId: number) =>
      this.db.object<Item>('/v0/item/' + selectedItemId).valueChanges().pipe(
        take(1),
        mergeMap(item => of(
          ItemsActions.loadSuccess({ payload: [item as Item] }),
          CommentActions.loadSuccess({ payload: item as Item }),
          ItemsActions.load({ payload: (item?.kids || []).slice(0, pageSize) })
        ))
      ))
  ));

  loadMore$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CommentActions.loadMore),
    withLatestFrom(this.store),
    map(([_, state]) => {
      const {
        items: { entities },
        comments: { pagination: { offset, limit }, comments: { selectedItemId } }
      } = state;
      const ids = entities[selectedItemId]?.kids || [];
      return ItemsActions.load({ payload: ids.slice(offset, offset + limit) });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromComments.State>,
    private db: AngularFireDatabase,
  ) {}
}
