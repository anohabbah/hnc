import { Component, Input } from '@angular/core';

import { Items } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input()
  items!: Items;
}
