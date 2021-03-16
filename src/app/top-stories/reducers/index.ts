import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRoot from '@hnc/reducers/item.reducer';
import * as fromTopStories from './top-stories.reducer';
import * as fromPagination from './pagination.reducer';
import * as fromItems from '@hnc/reducers/item.reducer';
import {Items} from '@hnc/models/item.interface';

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

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTopStoriesState = createFeatureSelector<TopStoriesState>('topStories');

export const getPaginationState = createSelector(
  getTopStoriesState,
  state => state.pagination,
);

export const isItemsLoading = createSelector(
  fromItems.getItemsState,
  fromItems.getLoading,
);

export const getItemsError = createSelector(
  fromItems.getItemsState,
  fromItems.getError,
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
  fromItems.getItemEntities,
  getPaginationState,
  (ids, entities, pagination) => {
    return ids
      .slice(0, pagination.offset + pagination.limit)
      .map(id => entities[id])
      .filter(item => !!item) as Items;
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
