import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesListPageRoutingModule } from './favorites-list-routing.module';

import { FavoritesListPage } from './favorites-list.page';
import {ComponentsModule} from '@hnc/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FavoritesListPageRoutingModule
  ],
  declarations: [FavoritesListPage]
})
export class FavoritesListPageModule {}
