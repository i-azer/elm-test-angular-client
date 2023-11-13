import { TestBed } from '@angular/core/testing';

import { ElmSearchService} from './elm-search-service.service';

describe('ElmSearchServiceService', () => {
  let service: ElmSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElmSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
