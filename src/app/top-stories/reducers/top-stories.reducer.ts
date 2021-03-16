import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '@hnc/top-stories/actions/top-stories.action';

export interface State {
  ids: number[];
  loading: boolean;
  error?: any;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: null,
};

const topStoriesReducer = createReducer(
  initialState,
  on(Actions.refresh, (state) => ({ ...state, loading: true, })),
  on(Actions.loadSuccess, (state, { payload }) => ({ error: null, loading: false, ids: payload, })),
  on(Actions.loadFail, (state, { payload }) => ({ ...state, loading: false, error: payload, })),
);

export function reducer(state: State | undefined, action: Action): State {
  return topStoriesReducer(state, action);
}

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
