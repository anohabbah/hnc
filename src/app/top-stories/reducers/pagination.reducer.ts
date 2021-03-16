import {Action, createReducer, on} from '@ngrx/store';

import * as Actions from '../actions/top-stories.action';

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
  on(Actions.refresh, (state) => ({ ...state, offset: 0, limit: pageSize })),
  on(Actions.loadMore, (state) => {
    const offset = state.offset + state.limit;
    return { ...state, offset: offset < state.total ? offset : state.offset };
  }),
  on(Actions.loadSuccess, (state, { payload }) => ({ ...state, total: payload.length, }))
);

export function reducer(state: State | undefined, action: Action): State {
  return paginationReducer(state, action);
}
