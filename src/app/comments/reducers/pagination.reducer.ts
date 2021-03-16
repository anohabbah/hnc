import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';

import * as CommentActions from '../actions/comments.action';

export interface State {
  offset: number;
  limit: number;
  total: number;
}

export const pageSize = 20;

const initialState: State = {
  offset: 0,
  limit: pageSize,
  total: 0,
};

const paginationReducer = createReducer(
  initialState,
  on(CommentActions.loadMore, (state) => {
    const offset = state.offset + state.limit;
    return {
      ...state,
      offset: offset < state.total ? offset : state.offset,
    };
  }),
  on(CommentActions.loadSuccess, (state, { payload }) => ({
    ...state,
    total: payload.kids?.length || 0,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return paginationReducer(state, action);
}
