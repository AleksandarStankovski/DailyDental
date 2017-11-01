import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Examination } from '../../../shared/models/examination.model';

@Injectable()
export class ExaminationService {

    private apiUrl = 'api';

    constructor(private http: Http) {}

    getExaminationsByPatient(id: string): Observable<Examination[]> {
        return this.http.get(`${this.apiUrl}/examinations/${id}`)
        .map(response => response.json() as Examination[]);
    }

    getExamination(id: string): Observable<Examination> {
        return this.http.get(`${this.apiUrl}/examination/${id}`)
        .map(response => response.json() as Examination);
    }

    createExamination(data: Examination): Observable<any> {
        return this.http.post(`${this.apiUrl}/examination/create`, data)
        .map(response => response.json());
    }

    editExamination(data: Examination): Observable<any> {
        return this.http.put(`${this.apiUrl}/examination/edit`, data)
        .map(response => response.json());
    }

    deleteExamination(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/examination/delete/${id}`)
        .map(response => response.json());
    }

}
