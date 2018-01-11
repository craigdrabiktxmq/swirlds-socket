import { TestBed, inject } from '@angular/core/testing';

import { DistributedEndpointService } from './distributed-endpoint.service';

describe('DistributedEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributedEndpointService]
    });
  });

  it('should be created', inject([DistributedEndpointService], (service: DistributedEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
