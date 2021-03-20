import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  {
  @Input() item!: Item;
  @Output() toOpen = new EventEmitter<string>();
  @Output() toShare = new EventEmitter<Item>();

  openPage(url: string): void {
    this.toOpen.emit(url);
  }

  share(): void {
    this.toShare.emit(this.item);
  }
}
