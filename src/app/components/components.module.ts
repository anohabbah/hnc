import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ItemComponent} from '@hnc/components/item/item.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import {ItemsComponent} from '@hnc/components/items/items.component';
import {IonicModule} from '@ionic/angular';
import {CommentComponent} from '@hnc/components/comment/comment.component';
import {CommentListComponent} from '@hnc/components/comment-list/comment-list.component';
import {RouterModule} from '@angular/router';

const DECLARATIONS = [ItemComponent, ItemsComponent, CommentComponent, CommentListComponent];

@NgModule({
  declarations: [...DECLARATIONS, TimeAgoPipe],
  imports: [
    CommonModule, IonicModule, RouterModule,
  ],
  exports: [...DECLARATIONS]
})
export class ComponentsModule { }
