import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { PatientService } from './patient.service';

@Injectable()
export class PatientGuardService implements CanActivate {

    constructor(
        private patientService: PatientService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
        const id = route.params['id'];
        return this.patientService.getPatient(id)
        .map(patient => !!patient)
        .catch(() => Observable.of(false))
        .do(hasPatient => {
            if (!hasPatient) {
                this.router.navigate(['/patients']);
            }
        });
    }

}
