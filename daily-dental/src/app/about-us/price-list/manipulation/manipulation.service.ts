import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Manipulation } from '../../../shared/models/manipulation.model';

@Injectable()
export class ManipulationService {

    private apiUrl = 'api';

    constructor(private http: Http) {}

    getAllManipulations(): Observable<Manipulation[]> {
        return this.http.get(`${this.apiUrl}/manipulations`)
        .map(response => response.json() as Manipulation[]);
    }

    getManipultion(id: string): Observable<Manipulation> {
        return this.http.get(`${this.apiUrl}/manipulation/${id}`)
        .map(response => response.json() as Manipulation);
    }

    createManipulation(data: Manipulation): Observable<any> {
        return this.http.post(`${this.apiUrl}/manipulation/create`, data)
        .map(response => response.json());
    }

    editManipulation(data: Manipulation): Observable<any> {
        return this.http.put(`${this.apiUrl}/manipulation/edit`, data)
        .map(response => response.json());
    }

    deleteManipulation(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/manipulation/delete/${id}`)
        .map(response => response.json());
    }

    getIcon(type: string): string {
        let icon;
        switch(type) {
            case 'aesthetic': {
                icon = 'icon-tooth-3'
                break;
            }
            case 'parodontology': {
                icon = 'icon-parodontology'
                break;
            }
            case 'pediatrics': {
                icon = 'icon-pediatrics'
                break;
            }
            case 'endodontics': {
                icon = 'icon-endodontics'
                break;
            }
            case 'orthodontics': {
                icon = 'icon-braces-2'
                break;
            }
            case 'surgery': {
                icon = 'icon-implant-2'
                break;
            }
            default: {
                icon = 'icon-tooth-5'
            }
        }
        return icon;
    }
}
