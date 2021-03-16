import {createAction, props} from '@ngrx/store';

export const enum TopStoriesActionTypes {
  Refresh = '[Top Stories] Refresh',
  LoadMore = '[Top Stories] Load More',
  LoadSuccess = '[Top Stories] Load Success',
  LoadFail = '[Top Stories] Load Fail',
}

export const refresh = createAction(TopStoriesActionTypes.Refresh);

export const loadMore = createAction(TopStoriesActionTypes.LoadMore);

export const loadSuccess = createAction(TopStoriesActionTypes.LoadSuccess, props<{ payload: number[] }>());

export const loadFail = createAction(TopStoriesActionTypes.LoadFail, props<{ payload: any }>());
