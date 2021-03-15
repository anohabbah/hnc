import { Component, Input } from '@angular/core';
import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  {
  @Input()
  item!: Item;
}
