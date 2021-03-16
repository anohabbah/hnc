import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommentsEffectEffects } from './effects/comments-effect.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forFeature([CommentsEffectEffects])
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
