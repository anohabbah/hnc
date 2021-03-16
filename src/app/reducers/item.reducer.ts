import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ItemActions from '../actions/item.action';
import { Item } from '@hnc/models/item.interface';

export interface State extends EntityState<Item> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter({
  selectId: (item) => item.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

const itemReducer = createReducer(
  initialState,
  on(ItemActions.load, (state) => ({ ...state, loading: true })),
  on(ItemActions.loadSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(ItemActions.loadFail, (state, { payload }) => ({ ...state, loading: false, error: payload })),
);

export function reducer(state: State | undefined, action: Action): State {
  return itemReducer(state, action);
}
