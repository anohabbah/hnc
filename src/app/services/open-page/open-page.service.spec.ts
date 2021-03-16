import { TestBed } from '@angular/core/testing';

import { OpenPageService } from './open-page.service';

describe('OpenPageService', () => {
  let service: OpenPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
