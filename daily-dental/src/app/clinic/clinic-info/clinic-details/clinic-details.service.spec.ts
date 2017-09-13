import { TestBed, inject } from '@angular/core/testing';

import { ClinicDetailsService } from './clinic-details.service';

describe('ClinicDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicDetailsService]
    });
  });

  it('should be created', inject([ClinicDetailsService], (service: ClinicDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
