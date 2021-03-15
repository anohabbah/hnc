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
  items: Items = { offset: 0, limit: 0, results: [] };
  subscription: Subscription | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.subscription = this.itemService.load(0, 10).subscribe(items => this.items = items);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
