import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import * as FavoritesActions from '@hnc/favorites/actions/favorites.action';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromAuth from '../../auth/reducers';
import { getItemEntities } from '@hnc/reducers/item.reducer';
import { FavoritesService } from '../services/favorites.service';
import {Favorite} from '@hnc/favorites/models/favorite.interface';
import {act} from '@ngrx/effects';
import {stat} from 'fs';

export interface FavoritesItem {
  itemId: number;
  timestamp?: number;
  loading: boolean;
}

export const adapter: EntityAdapter<FavoritesItem> = createEntityAdapter<FavoritesItem>({
  selectId: (item: FavoritesItem) => item.itemId,
// @ts-ignore
  sortComparer: (item1, item2) => item1.timestamp - item2.timestamp,
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
  on(FavoritesActions.removeSuccess, FavoritesActions.addFailure, (state, action) => adapter.removeOne(action.payload, state))
)

export function reducer(state: State | undefined, action: Action): State {
  return favoritesReducer(state, action);
}

export const getFavoritesState = createFeatureSelector<State>('favorites');

export const {
  selectEntities: selectFavoriteEntities,
  selectIds: selectFavorites,
} = adapter.getSelectors(getFavoritesState);
export const inFavorite = (itemId: number) => createSelector(
  selectFavoriteEntities,
  (entities) => {
    const entity = entities[itemId];
    return !entity?.loading;
  }
);

export const getLoading = (itemId: number) => createSelector(
  selectFavoriteEntities,
  entities => entities[itemId]?.loading
);

export const getFavoriteItems = createSelector(
  selectFavorites,
  selectFavoriteEntities,
  getItemEntities,
  (ids: number[], favorites, entities) =>
    ids
      .filter(id => !favorites[id]?.loading)
      .map(id => entities[id])
);
