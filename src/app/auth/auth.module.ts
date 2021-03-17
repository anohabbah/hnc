import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, stateFeatureKey } from '@hnc/auth/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@hnc/auth/effects';
import { AuthService } from '@hnc/auth/services/auth.service';
import { AuthRoutingModule } from '@hnc/auth/auth-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(stateFeatureKey, reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthService],
})
export class AuthModule {}
