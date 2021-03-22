import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ItemComponent } from '@hnc/components/item/item.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { ItemsComponent } from '@hnc/components/items/items.component';
import { CommentComponent } from '@hnc/components/comment/comment.component';
import { CommentListComponent } from '@hnc/components/comment-list/comment-list.component';
import { FavoritesModule } from '@hnc/favorites/favorites.module';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

const DECLARATIONS = [ItemComponent, ItemsComponent, CommentComponent, CommentListComponent];

@NgModule({
  declarations: [...DECLARATIONS, TimeAgoPipe, ClickStopPropagationDirective],
    imports: [
        CommonModule, IonicModule, RouterModule, FavoritesModule,
    ],
  exports: [...DECLARATIONS]
})
export class ComponentsModule { }
