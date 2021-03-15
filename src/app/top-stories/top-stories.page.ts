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

  private doLoad(refresh: boolean): void {
    this.itemService.load({ offset: this.offset, limit: this.limit, refresh });

    this.offset += this.limit;
  }
}
