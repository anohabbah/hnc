import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromRoot from '@hnc/reducers/item.reducer';
import * as fromTopStories from './top-stories.reducer';
import * as fromPagination from './pagination.reducer';
import { getItemEntities, getError as getItemsError } from '@hnc/reducers/item.reducer';

export const stateFeatureKey = 'topStories';

export interface TopStoriesState {
  stories: fromTopStories.State;
  pagination: fromPagination.State;
}

export interface State extends fromRoot.State {
  [stateFeatureKey]: TopStoriesState;
}

export const reducers: ActionReducerMap<TopStoriesState> = {
  stories: fromTopStories.reducer,
  pagination: fromPagination.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTopStoriesState = createFeatureSelector<TopStoriesState>('topStories');

export const getPaginationState = createSelector(
  getTopStoriesState,
  state => state.pagination,
);

export const getStoriesState = createSelector(
  getTopStoriesState,
  state => state.stories,
);

export const getStoryIds = createSelector(
  getStoriesState,
  fromTopStories.getIds,
);

export const getDisplayItems = createSelector(
  getStoryIds,
  getItemEntities,
  getPaginationState,
  (ids, entities, pagination) => {
    return ids.slice(0, pagination.offset + pagination.limit).map(id => entities[id]);
  }
);

export const isTopStoriesLoading = createSelector(
  getStoriesState,
  fromTopStories.getLoading,
);

export const getTopStoriesError = createSelector(
  getStoriesState,
  fromTopStories.getError,
);

export const getError = createSelector(
  getTopStoriesError,
  getItemsError,
  (e1, e2) => e1 || e2,
);
