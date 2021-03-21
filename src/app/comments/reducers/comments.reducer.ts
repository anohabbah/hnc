import {
  Action,
  ActionReducer,
  createReducer,
  on
} from '@ngrx/store';

import * as CommentActions from '../actions/comments.action';

export interface State {
  selectedItemId: number;
}

const initialState: State = { selectedItemId: -1 };

const commentReducer: ActionReducer<State> = createReducer(
  initialState,
  on(CommentActions.loadSuccess, (state, { payload }) => ({ ...state, selectedItemId: payload.id })),
);

export function reducer(state: State | undefined, action: Action): State {
  return commentReducer(state, action);
}

export const getSelectedItemId = (state: State) => state.selectedItemId;
