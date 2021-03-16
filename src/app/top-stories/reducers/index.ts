import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromRoot from '@hnc/reducers/item.reducer';
import * as fromTopStories from './top-stories.reducer';
import * as fromPagination from './pagination.reducer';

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
