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

    // getAllSpecialities(): Speciality[] {
    //     const specialities = [
    //         {
    //             type: 'aesthetic',
    //             name: 'Естетика'
    //         },
    //         {
    //             type: 'parodontology',
    //             name: 'Пародонтология'
    //         },
    //         {
    //             type: 'pediatrics',
    //             name: 'Педиатрия'
    //         },
    //         {
    //             type: 'endodontics',
    //             name: 'Ендодонтия'
    //         },
    //         {
    //             type: 'orthodontics',
    //             name: 'Ортодонтия'
    //         },
    //         {
    //             type: 'surgery',
    //             name: 'Хирургия'
    //         }
    //     ];
    //     return specialities;
    // }

}
