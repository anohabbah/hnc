import { Component, OnInit, Input } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFavorites from '@hnc/favorites/reducers';
import { add, remove } from '@hnc/favorites/actions/favorites.action';
import * as fromAuth from '@hnc/auth/reducers';

@Component({
  selector: 'hnc-favorite-toggler',
  templateUrl: './favorite-toggler.component.html',
  styleUrls: ['./favorite-toggler.component.scss'],
})
export class FavoriteTogglerComponent implements OnInit {
  @Input() itemId!: number;
  isLoggedIn$: Observable<boolean> | null = null;
  inFavorite$: Observable<boolean> | null = null;
  loading$: Observable<boolean> | null = null;

  constructor(private store: Store<fromFavorites.State>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.inFavorite$ = this.store.pipe(select(fromFavorites.inFavorite(this.itemId)));
    this.loading$ = this.store.pipe(select(fromFavorites.getLoading(this.itemId)));
  }

  add(): void {
    this.store.dispatch(add({ payload: this.itemId }));
  }

  remove(): void {
    this.store.dispatch(remove({ payload: this.itemId }));
  }
}
