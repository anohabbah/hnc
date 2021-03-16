import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {catchError, map, mergeMap, switchMap, take, withLatestFrom} from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';

import * as ItemActions from '@hnc/actions/item.action';
import * as fromTopStories from '@hnc/top-stories/reducers';
import { pageSize } from '@hnc/top-stories/reducers/pagination.reducer';
import * as TopStoriesActions from '@hnc/top-stories/actions/top-stories.action';

@Injectable()
export class TopStoriesEffects {
  loadTopStories$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TopStoriesActions.refresh),
    switchMap(() =>
      this.db.list<number>('/v0/topstories').valueChanges()
        .pipe(
          take(1),
          mergeMap((ids: number[]) => of<Action>(
            TopStoriesActions.loadSuccess({ payload: ids }),
            ItemActions.load({ payload: ids.slice(0, pageSize) })
          )),
          catchError(error => of(TopStoriesActions.loadFail(error))),
        )
    )
  ));

  loadMore$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TopStoriesActions.loadMore),
    withLatestFrom(this.store),
    map(([_, state]) => {
      const {
        pagination: {
          offset,
          limit,
        },
        stories: {
          ids,
        }
      } = state.topStories;
      return ItemActions.load({ payload: ids.slice(offset, offset + limit) });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromTopStories.State>,
    private db: AngularFireDatabase,
  ) {
  }
}
