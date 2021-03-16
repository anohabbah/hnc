import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TopStoriesEffects } from './top-stories.effects';

describe('TopStoriesEffects', () => {
  let actions$: Observable<any>;
  let effects: TopStoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TopStoriesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TopStoriesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
