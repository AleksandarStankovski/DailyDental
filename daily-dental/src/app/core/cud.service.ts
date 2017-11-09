import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CudService {

    private apiUrl = 'api';

    constructor(private http: Http) {}

    create(type: string, data): Observable<any> {
        return this.http.post(`${this.apiUrl}/${type}/create`, data)
        .map(response => response.json());
    }

    edit(type: string, data): Observable<any> {
        return this.http.put(`${this.apiUrl}/${type}/edit`, data)
        .map(response => response.json());
    }

    delete(type: string, id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${type}/delete/${id}`)
        .map(response => response.json());
    }
}