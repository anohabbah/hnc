import { createAction, props } from '@ngrx/store';
import { Favorite } from '../models/favorite.interface';

export enum FavoritesActionTypes {
  Load = '[Favorites] Load',
  Clear = '[Favorites] Clear',
  LoadSuccess = '[Favorites] Load Success',
  LoadFailure = '[Favorites] Load Failure',
  Add = '[Favorites] Add',
  AddSuccess = '[Favorites] Add Success',
  AddFailure = '[Favorites] Add Failure',
  Remove = '[Favorites] Remove',
  RemoveSuccess = '[Favorites] Remove Success',
  RemoveFailure = '[Favorites] Remove Failure',
}

export const load = createAction(FavoritesActionTypes.Load);

export const loadSuccess = createAction(FavoritesActionTypes.LoadSuccess, props<{ payload: Favorite[] }>());

export const loadFailure = createAction(FavoritesActionTypes.LoadFailure, props<{ payload: any }>());

export const add = createAction(FavoritesActionTypes.Add, props<{ payload: number }>());

export const addSuccess = createAction(FavoritesActionTypes.AddSuccess, props<{ payload: Favorite }>());

export const addFailure = createAction(FavoritesActionTypes.AddFailure, props<{ payload: number }>());

export const remove = createAction(FavoritesActionTypes.Remove, props<{ payload: number }>());

export const removeSuccess = createAction(FavoritesActionTypes.RemoveSuccess, props<{ payload: number }>());

export const removeFailure = createAction(FavoritesActionTypes.RemoveFailure, props<{ payload: number }>());

export const clear = createAction(FavoritesActionTypes.Clear);
