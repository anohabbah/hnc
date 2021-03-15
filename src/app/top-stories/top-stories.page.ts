import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemService } from '@hnc/services/item/item.service';
import { Items } from '@hnc/models/item.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hnc-top-stories',
  templateUrl: './top-stories.page.html',
  styleUrls: ['./top-stories.page.scss'],
})
export class TopStoriesPage implements OnInit, OnDestroy {
  items: Items = [];
  subscription: Subscription | null = null;
  private offset = 0;
  private limit = 10;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.subscription = this.itemService.get().subscribe(items => this.items = items);

    this.doLoad(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasPrevious(): boolean {
    return this.offset > 0;
  }

  previous(): void {
    if (!this.hasPrevious()) {
      return;
    }

    this.offset -= this.limit;
    this.doLoad(false);
  }

  hasNext(): boolean {
    return this.items && this.offset + this.limit < 100;
  }

  next(): void {
    if (!this.hasNext()) {
      return;
    }

    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return !!this.items;
  }

  refresh(): void {
    if (!this.canRefresh()) {
      return;
    }

    this.offset = 0;
    this.doLoad(true);
  }

  private doLoad(refresh: boolean): void {
    this.itemService.load({ offset: this.offset, limit: this.limit, refresh });
  }
}
