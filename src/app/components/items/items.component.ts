import {Component, EventEmitter, Input, Output} from '@angular/core';

import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input()
  items!: Item[];

  @Output()
  toOpen = new EventEmitter<string>();

  openPage(url: string): void {
    return this.toOpen.emit(url);
  }
}
