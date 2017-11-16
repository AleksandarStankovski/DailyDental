import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Clinic } from '../../shared/models/clinic.model';
import { ClinicService } from './clinic/clinic.service';


@Injectable()
export class ClinicInfoResolveService implements Resolve<Clinic[]> {

    constructor(private clinicService: ClinicService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.clinicService.getAllClinics();
    }

}
