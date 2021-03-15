import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopStoriesPageRoutingModule } from './top-stories-routing.module';

import { TopStoriesPage } from './top-stories.page';
import {ComponentsModule} from '@hnc/components/components.module';
import {ServicesModule} from '@hnc/services/services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopStoriesPageRoutingModule,
    ComponentsModule,
    ServicesModule
  ],
  declarations: [TopStoriesPage]
})
export class TopStoriesPageModule {}
