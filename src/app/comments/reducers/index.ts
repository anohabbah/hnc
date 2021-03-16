import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromComments from './comments.reducer';
import * as fromPagination from './pagination.reducer';
import * as fromRoot from '@hnc/reducers';
import { getItemEntities } from '@hnc/reducers/item.reducer';
import { Items } from '@hnc/models/item.interface';

export const stateFeatureKey = 'comments';

export interface CommentState {
  comments: fromComments.State;
  pagination: fromPagination.State;
}

export interface State extends fromRoot.State {
  comments: CommentState;
}

export const reducers: ActionReducerMap<CommentState> = {
  comments: fromComments.reducer,
  pagination: fromPagination.reducer,
};

export const getCommentsFeatureState = createFeatureSelector <CommentState>('comments');

export const getCommentsState = createSelector(
  getCommentsFeatureState,
  state => state.comments,
);

export const getPaginationState = createSelector(
  getCommentsFeatureState,
  state => state.pagination,
);

export const getSelectedItemId = createSelector(
  getCommentsState,
  fromComments.getSelectedItemId,
);

export const getSelectedItem = createSelector(
  getItemEntities,
  getSelectedItemId,
  (entities, id) => entities[id],
);

export const getSelectedItemChildren = createSelector(
  getSelectedItem,
  getItemEntities,
  getPaginationState,
  (item, entities, pagination) => {
    return item ? (item.kids || []).slice(0, pagination.offset + pagination.limit)
      .map(id => entities[id]) : [] as Items;
  }
);
