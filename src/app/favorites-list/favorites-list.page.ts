import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromFavorites from '@hnc/favorites/reducers';
import {select, Store} from '@ngrx/store';
import {load} from '@hnc/favorites/actions/favorites.action';
import {Items} from '@hnc/models/item.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hnc-favorites-list',
  templateUrl: './favorites-list.page.html',
  styleUrls: ['./favorites-list.page.scss'],
})
export class FavoritesListPage implements OnInit {
  items$: Observable<Items>;

  constructor(private store: Store<fromFavorites.State>) {
    this.items$ = store.pipe(select(fromFavorites.getFavoriteItems));
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }
}
