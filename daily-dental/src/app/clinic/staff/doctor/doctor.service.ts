import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Doctor } from '../../../shared/models/doctor.model';

@Injectable()
export class DoctorService {

  private apiUrl = 'api';

  constructor(private http: Http) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get(`${this.apiUrl}/doctors`)
    .map(response => response.json() as Doctor[]);
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get(`${this.apiUrl}/doctor/${id}`)
    .map(response => response.json() as Doctor);
  }

  createDoctor(data: Doctor): Observable<any> {
    return this.http.post(`${this.apiUrl}/doctor/create`, data)
    .map(response => response.json());
  }

  editDoctor(data: Doctor): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctor/edit`, data)
    .map(response => response.json());
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/doctor/delete/${id}`)
    .map(response => response.json());
  }

}
