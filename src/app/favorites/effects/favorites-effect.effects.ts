import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromAuth from '@hnc/auth/reducers';
import { FavoritesService } from '@hnc/favorites/services/favorites.service';
import {Action, Store} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {
  add,
  addFailure,
  addSuccess,
  load,
  loadSuccess, remove, removeFailure, removeSuccess
} from '@hnc/favorites/actions/favorites.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as ItemsActions from '@hnc/actions/item.action';

@Injectable()
export class FavoritesEffectEffects {
  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(load),
    withLatestFrom(this.store),
    mergeMap(([_, state]) => {
      const { auth: { auth: { user } } } = state;

      return from(this.favoritesService.list(user.uid)).pipe(
        mergeMap(favorites => of<Action>(
          loadSuccess({ payload: favorites }),
          ItemsActions.load({ payload: favorites.map(f => f.itemId) })
        ))
      );
    })
  ));

  add$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(add),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => {
      const { auth: { auth: { user } } } = state;
      const itemId: number = action.payload;

      return from(this.favoritesService.add(user.uid, itemId)).pipe(
        map(result => addSuccess({ payload: result })),
        catchError(() => of(addFailure({ payload: itemId })))
      );
    })
  ));

  remove$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(remove),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => {
      const { auth: { auth: { user } } } = state;
      const itemId = action.payload;

      return from(this.favoritesService.remove(user.uid, itemId)).pipe(
        map(() => removeSuccess({ payload: itemId })),
        catchError(() => of(removeFailure({ payload: itemId })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromAuth.State>,
    private favoritesService: FavoritesService
  ) {}
}
