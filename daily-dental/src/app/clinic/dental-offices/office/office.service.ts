import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Office } from '../../../shared/models/office.model';

@Injectable()
export class OfficeService {

  private apiUrl = 'api';

  constructor(private http: Http) { }

  getAllOffices(): Observable<Office[]> {
    return this.http.get(`${this.apiUrl}/offices`)
    .map(response => response.json() as Office[]);
  }

  getOffice(id: string): Observable<Office> {
    return this.http.get(`${this.apiUrl}/office/${id}`)
    .map(response => response.json() as Office);
  }

  createOffice(data: Office): Observable<any> {
    return this.http.post(`${this.apiUrl}/office/create`, data)
    .map(response => response.json());
  }

  editOffice(data: Office): Observable<any> {
    return this.http.put(`${this.apiUrl}/office/edit`, data)
    .map(response => response.json());
  }

  deleteOffice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/office/delete/${id}`)
    .map(response => response.json());
  }
}
