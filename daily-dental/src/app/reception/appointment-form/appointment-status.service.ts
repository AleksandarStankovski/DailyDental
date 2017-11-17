import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AppointmentStatus } from '../../shared/models/appointment-status.model';

@Injectable()
export class AppointmentStatusService {

    constructor(private http: Http) { }

    getAllStatuses(): Observable<AppointmentStatus[]> {
        return this.http.get(`/assets/json/appointment-status.json`)
        .map(response => response.json() as AppointmentStatus[]);
    }

}
