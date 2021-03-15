import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ItemComponent} from '@hnc/components/item/item.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import {ItemsComponent} from '@hnc/components/items/items.component';
import {IonicModule} from '@ionic/angular';

const DECLARATIONS = [ItemComponent, ItemsComponent];

@NgModule({
  declarations: [...DECLARATIONS, TimeAgoPipe],
  imports: [
    CommonModule, IonicModule,
  ],
  exports: [...DECLARATIONS]
})
export class ComponentsModule { }
