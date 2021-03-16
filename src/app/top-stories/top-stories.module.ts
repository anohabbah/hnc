import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopStoriesPageRoutingModule } from './top-stories-routing.module';

import { TopStoriesPage } from './top-stories.page';
import {ComponentsModule} from '@hnc/components/components.module';
import {ServicesModule} from '@hnc/services/services.module';
import { EffectsModule } from '@ngrx/effects';
import { TopStoriesEffects } from './effects/top-stories.effects';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopStoriesPageRoutingModule,
    ComponentsModule,
    ServicesModule,
    EffectsModule.forFeature([TopStoriesEffects]),
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers })
  ],
  declarations: [TopStoriesPage]
})
export class TopStoriesPageModule {}
