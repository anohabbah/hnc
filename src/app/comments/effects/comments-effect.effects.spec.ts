import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommentsEffectEffects } from './comments-effect.effects';

describe('CommentsEffectEffects', () => {
  let actions$: Observable<any>;
  let effects: CommentsEffectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsEffectEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CommentsEffectEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
