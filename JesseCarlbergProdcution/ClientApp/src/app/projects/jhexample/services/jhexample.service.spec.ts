import { TestBed } from '@angular/core/testing';

import { JHExampleService } from './jhexample.service';

describe('JHExampleService', () => {
  let service: JHExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JHExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
