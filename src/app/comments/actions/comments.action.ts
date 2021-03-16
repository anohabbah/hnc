import {createAction, props} from '@ngrx/store';
import {Item} from '@hnc/models/item.interface';

export const enum CommentActionTypes {
  Select = '[Comments] Select',
  LoadMore = '[Comments] Load More',
  LoadSuccess = '[Comments] Load Success',
}

export const select = createAction(CommentActionTypes.Select, props<{ payload: number }>());

export const loadSuccess = createAction(CommentActionTypes.LoadSuccess, props<{ payload: Item }>());

export const loadMore = createAction(CommentActionTypes.LoadMore);
