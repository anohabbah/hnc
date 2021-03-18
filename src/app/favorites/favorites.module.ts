import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffectEffects } from './effects/favorites-effect.effects';
import { FavoriteToggleComponent } from '@hnc/favorites/components/favorite-toggle/favorite-toggle.component';
import { FavoriteTogglerComponent } from '@hnc/favorites/components/favorite-toggler/favorite-toggler.component';
import {FavoritesService} from '@hnc/favorites/services/favorites.service';
import {IonicModule} from '@ionic/angular';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
    declarations: [FavoriteToggleComponent, FavoriteTogglerComponent],
    exports: [
        FavoriteTogglerComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
      // AngularFireStorageModule,
      StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducer),
      EffectsModule.forFeature([FavoritesEffectEffects])
    ],
  providers: [FavoritesService],
})
export class FavoritesModule { }
