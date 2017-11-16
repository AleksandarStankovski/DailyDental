import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Doctor } from '../../shared/models/doctor.model';
import { DoctorService } from './doctor/doctor.service';


@Injectable()
export class StaffResolveService implements Resolve<Doctor[]> {

    constructor(private doctorService: DoctorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.doctorService.getAllDoctors();
    }

}
