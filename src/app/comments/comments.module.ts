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
import {ComponentsModule} from '@hnc/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers),
    EffectsModule.forFeature([CommentsEffectEffects]),
    ComponentsModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
