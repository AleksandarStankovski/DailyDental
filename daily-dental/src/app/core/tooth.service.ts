import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Tooth } from '../shared/models/tooth.model';

@Injectable()
export class ToothService {

    constructor(private http: Http) { }

    getAllTeeth(): Observable<Tooth[]> {
        return this.http.get(`/assets/json/teeth.json`)
        .map(response => response.json() as Tooth[]);
    }

}
