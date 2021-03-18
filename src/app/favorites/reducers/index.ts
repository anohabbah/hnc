import * as FavoritesActions from '../actions/favorites.action';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import { getItemEntities } from '@hnc/reducers/item.reducer';
import {Items} from '@hnc/models/item.interface';

export const stateFeatureKey = 'favorites';

export interface FavoritesItem {
  itemId: number;
  timestamp?: number;
  loading: boolean;
}

export const adapter: EntityAdapter<FavoritesItem> = createEntityAdapter<FavoritesItem>({
  selectId: (item: FavoritesItem) => item.itemId,
  // @ts-ignore
  sortComparer: (item1, item2) => item2.timestamp - item1.timestamp,
});

export type State = EntityState<FavoritesItem>;

export interface FavoritesState {
  auth: fromAuth.State;
  favorites: State;
}

export const initialState: State = adapter.getInitialState();

const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.loadSuccess, (state, action) => adapter.upsertMany(action.payload.map(item => ({
    ...item,
    loading: false,
  })), state)),
  on(FavoritesActions.add, (state, action) => adapter.addOne({
    itemId: action.payload,
    loading: true,
  }, state)),
  on(FavoritesActions.remove, (state, action) => adapter.updateOne({
    id: action.payload,
    changes: {
      loading: true,
    },
  }, state)),
  on(FavoritesActions.addSuccess, (state, action) => adapter.updateOne({
    id: action.payload.itemId,
    changes: {
      ...action.payload,
      loading: false,
    },
  }, state)),
  on(FavoritesActions.removeFailure, (state, action) => adapter.updateOne({
    id: action.payload,
    changes: {
      loading: false,
    },
  }, state)),
  on(FavoritesActions.removeSuccess, FavoritesActions.addFailure, (state, action) => adapter.removeOne(action.payload, state)),
  on(FavoritesActions.clear, (state) => adapter.removeAll(state)),
);

export function reducer(state: State | undefined, action: Action): State {
  return favoritesReducer(state, action);
}

export const getFavoritesState = createFeatureSelector<State>('favorites');

export const {
  selectEntities: selectFavoriteEntities,
  selectIds: selectFavorites
} = adapter.getSelectors(getFavoritesState);


export const inFavorite = (itemId: number) => createSelector(
  selectFavoriteEntities,
  entities => !Boolean(entities[itemId]?.loading)
);

export const getLoading = (itemId: number) => createSelector(
  selectFavoriteEntities,
  entities => Boolean(entities[itemId]?.loading)
);

export const getFavoriteItems = createSelector(
  selectFavorites,
  selectFavoriteEntities,
  getItemEntities,
  function(ids, favorites, entities) {
    return ids
      // @ts-ignore
      .filter((id: number | string) => !favorites[id]?.loading)
      .map((id: number | string) => entities[id]) as Items;
  }
)
