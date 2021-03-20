import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Item, Items } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input() items!: Items;
  @Output() toOpen = new EventEmitter<string>();
  @Output() toShare = new EventEmitter<Item>();

  openPage(url: string): void {
    this.toOpen.emit(url);
  }

  share(item: Item): void {
    this.toShare.emit(item);
  }
}
