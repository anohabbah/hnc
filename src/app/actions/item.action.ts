import {createAction, props} from '@ngrx/store';
import {Item} from '@hnc/models/item.interface';

export const enum ItemActionTypes {
  Load = '[Items] Load',
  LoadSuccess = '[Items] LoadSuccess',
  LoadFail = '[Items] LoadFail',
}

export const load = createAction(ItemActionTypes.Load, props<{ payload: number[] }>());

export const loadSuccess = createAction(ItemActionTypes.LoadSuccess, props<{ payload: Item[] }>());

export const loadFail = createAction(ItemActionTypes.LoadFail, props<{ payload: any }>());
