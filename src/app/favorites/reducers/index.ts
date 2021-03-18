import {
  ActionReducerMap,
} from '@ngrx/store';

import * as fromFavorites from './favorites';

export const stateFeatureKey = 'favorites';

export interface FavoritesState {
  favorites: fromFavorites.State;
}

export const reducers: ActionReducerMap<FavoritesState> = {
  favorites: fromFavorites.reducer,
};
