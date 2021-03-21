import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as fromItems from '@hnc/reducers/item.reducer';
import * as fromComments from './reducers';
import * as CommentsActions from './actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Items } from '../models/item.interface';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hnc-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit, OnDestroy {
  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private infiniteScrollComponent: any;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromComments.State>,
    private location: Location
  ) {
    this.items$ = store.pipe(select(fromComments.getSelectedItemChildren));
    this.itemsLoading$ = store.pipe(select(fromItems.isItemsLoading));
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.itemsLoading$.subscribe(loading => {
      if (!loading) {
        this.notifyScrollComplete();
      }
    }));

    this.subscriptions.push(this.route.params.pipe(
      map(params => CommentsActions.select({ payload: parseInt(params.id, 10) }))
    ).subscribe(this.store));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  load(event: any): void {
    this.infiniteScrollComponent = event.target;
    this.store.dispatch(CommentsActions.loadMore());
  }

  goBack(): void {
    return this.location.back();
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }
}
