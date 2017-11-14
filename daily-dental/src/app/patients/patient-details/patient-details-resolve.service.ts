import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

import { Patient } from '../../shared/models/patient.model';
import { PatientService } from '../patient/patient.service';


@Injectable()
export class PatientDetailsResolveService implements Resolve<Patient>{

    constructor(private patientService: PatientService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.params['id'];
        return this.patientService.getPatient(id);
    }
    
}
