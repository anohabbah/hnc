import { Component, Input } from '@angular/core';
import { Items } from '@hnc/models/item.interface';

@Component({
  selector: 'hnc-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input() items: Items = [];
}
