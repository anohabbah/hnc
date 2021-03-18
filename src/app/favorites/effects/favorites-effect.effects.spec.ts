import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FavoritesEffectEffects } from './favorites-effect.effects';

describe('FavoritesEffectEffects', () => {
  let actions$: Observable<any>;
  let effects: FavoritesEffectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesEffectEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FavoritesEffectEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
