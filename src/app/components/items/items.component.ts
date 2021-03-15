import { Component, Input } from '@angular/core';

import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input()
  items!: Item[];
}
