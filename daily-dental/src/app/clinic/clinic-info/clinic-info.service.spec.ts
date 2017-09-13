import { TestBed, inject } from '@angular/core/testing';

import { ClinicInfoService } from './clinic-info.service';

describe('ClinicInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicInfoService]
    });
  });

  it('should be created', inject([ClinicInfoService], (service: ClinicInfoService) => {
    expect(service).toBeTruthy();
  }));
});
