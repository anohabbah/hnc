import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  {
  @Input()
  item!: Item;

  @Output()
  toOpen = new EventEmitter<string>();

  openPage(url: string): void {
    return this.toOpen.emit(url);
  }
}
