import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Nav } from '../shared/models/nav.model';

@Injectable()
export class NavService {

    constructor(private http: Http) { }

    getHeaderNavList(): Observable<Nav[]> {
        return this.http.get(`/assets/json/header-navigation.json`)
        .map(response => response.json() as Nav[]);
    }

    getHomeNavList(): Observable<Nav[]> {
        return this.http.get(`/assets/json/home-navigation.json`)
        .map(response => response.json() as Nav[]);
    }

    getAboutUsNavList(): Observable<Nav[]> {
        return this.http.get(`/assets/json/about-us-navigation.json`)
        .map(response => response.json() as Nav[]);
    }

}
