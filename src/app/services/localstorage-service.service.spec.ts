import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './localstorage-service.service';

describe('CustomerServiceService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
