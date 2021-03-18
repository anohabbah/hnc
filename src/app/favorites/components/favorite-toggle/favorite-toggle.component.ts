import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hnc-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss'],
})
export class FavoriteToggleComponent {
  @Input() itemId!: number;
  @Input() inFavorite!: boolean;
  @Input() loading!: boolean;
  @Output() toAdd: EventEmitter<number> = new EventEmitter<number>();
  @Output() toRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  add(): void {
    this.toAdd.emit(this.itemId);
  }

  remove(): void {
    this.toRemove.emit(this.itemId);
  }
}
