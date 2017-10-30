import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Patient } from '../../shared/models/patient.model';

@Injectable()
export class PatientService {

    private apiUrl = 'api';

    constructor(private http: Http) { }

    getAllPatients(): Observable<Patient[]> {
        return this.http.get(`${this.apiUrl}/patients`)
        .map(response => response.json() as Patient[]);
    }

    getPatientsByPage(currentPage: number, itemsPerPage: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/patients/pagination?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`)
        .map(response => response.json());
    }

    getFilteredPatients(searchText: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/patients/search?searchText=${searchText}`)
        .map(response => response.json());
    }

    getPatient(id: string): Observable<Patient> {
        return this.http.get(`${this.apiUrl}/patient/${id}`)
        .map(response => response.json() as Patient);
    }

    createPatient(data: Patient): Observable<any> {
        return this.http.post(`${this.apiUrl}/patient/create`, data)
        .map(response => response.json());
    }

    editPatient(data: Patient): Observable<any> {
        return this.http.put(`${this.apiUrl}/patient/edit`, data)
        .map(response => response.json());
    }

    deletePatient(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/patient/delete/${id}`)
        .map(response => response.json());
    }

}
