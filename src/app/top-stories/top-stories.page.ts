import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

import { Items } from '@hnc/models/item.interface';
import * as fromTopStories from './reducers';
import * as topStoriesActions from './actions/top-stories.action';
import { select, Store } from '@ngrx/store';
import { OpenPageService } from '@hnc/services/open-page/open-page.service';

@Component({
  selector: 'hnc-top-stories',
  templateUrl: './top-stories.page.html',
  styleUrls: ['./top-stories.page.scss'],
})
export class TopStoriesPage implements OnInit, OnDestroy {
  items$: Observable<Items>;

  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private error$: Observable<any>;
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  private loading: HTMLIonLoadingElement | null = null;
  private subscriptions: Subscription[];

  constructor(
    private store: Store<fromTopStories.State>,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private openPageService: OpenPageService,
  ) {
    this.items$ = store.pipe(select(fromTopStories.getDisplayItems));
    this.itemsLoading$ = store.pipe(select(fromTopStories.isItemsLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));
    this.error$ = store.pipe(
      select(fromTopStories.getError),
      filter(err => !!err)
    );

    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.itemsLoading$.subscribe(loading => {
      if (!loading) {
        this.notifyScrollComplete();
      }
    }));

    this.subscriptions.push(
      this.idsLoading$.pipe(concatMap(loading => {
        return loading ? from(this.showLoading()) : from(this.hideLoading());
      })).subscribe()
    );

    this.subscriptions.push(
      this.error$.pipe(concatMap(error => from(this.showError(error)))).subscribe()
    );

    this.doLoad(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  load(event: any): void {
    this.infiniteScrollComponent = event.target;

    this.doLoad(false);
  }

  refresh(event: any): void {
    this.refresherComponent = event.target;

    this.doLoad(true);
  }

  openPage(url: string): void {
    return this.openPageService.open(url);
  }

  private doLoad(refresh: boolean): void {
    if (refresh) {
      this.store.dispatch(topStoriesActions.refresh());
    } else {
      this.store.dispatch(topStoriesActions.loadMore());
    }
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  private showLoading(): Promise<void> {
    return this.hideLoading()
      .then(() => this.loadingCtrl.create({ message: 'Loading...', }))
      .then(loading => {
        this.loading = loading;
        return this.loading.present();
      });
  }

  private hideLoading(): Promise<void> {
    if (this.loading) {
      this.notifyRefreshComplete();
      return this.loading.dismiss().then();
    }
    return Promise.resolve();
  }

  private showError(error: any): Promise<void> {
    return this.toastCtrl.create({
      message: `An error occurred: ${error}`,
      duration: 3000,
      keyboardClose: true,
    }).then(toast => toast.present());
  }
}
