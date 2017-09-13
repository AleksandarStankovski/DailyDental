import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Clinic } from '../../shared/models/clinic.model';

@Injectable()
export class ClinicInfoService {

  private apiUrl = 'api'

  constructor(private http: Http) { }

  getAllClinics(): Observable<Clinic[]> {
    return this.http.get(`${this.apiUrl}/clinics`)
    .map(response => response.json() as Clinic[]);
  }

  getClinic(id: string): Observable<Clinic> {
    return this.http.get(`${this.apiUrl}/clinic/${id}`)
    .map(response => response.json() as Clinic);
  }

  createClinic(data: Clinic): Observable<any> {
    return this.http.post(`${this.apiUrl}/clinic/create`, data)
    .map(response => response.json());
  }

  editClinic(data: Clinic): Observable<any> {
    return this.http.put(`${this.apiUrl}/clinic/edit`, data)
    .map(response => response.json());
  }
}
