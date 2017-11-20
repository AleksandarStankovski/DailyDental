import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Hour } from '../../shared/models/hour.model';

@Injectable()
export class AppointmentHourService {

    constructor(private http: Http) { }

    getAllHours(): Observable<Hour[]> {
        return this.http.get(`/assets/json/appointment-hours.json`)
        .map(response => response.json() as Hour[]);
    }

}
