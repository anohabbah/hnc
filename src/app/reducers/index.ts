import { ActionReducerMap } from '@ngrx/store';

import * as fromItem from './item.reducer';


export interface State {
  items: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {
  items: fromItem.reducer,
};
