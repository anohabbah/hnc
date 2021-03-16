import { Component, Input } from '@angular/core';
import { Item } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() item!: Item;
}
