import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Speciality } from '../shared/models/speciality.model';

@Injectable()
export class SpecialityService {

    constructor(private http: Http) { }

    getAllSpecialities(): Observable<Speciality[]> {
        return this.http.get(`/assets/json/specialities.json`)
        .map(response => response.json() as Speciality[]);
    }

}
