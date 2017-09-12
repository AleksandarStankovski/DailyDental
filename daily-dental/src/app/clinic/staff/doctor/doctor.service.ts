import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Doctor } from '../../../shared/models/doctor.model';

@Injectable()
export class DoctorService {

  private doctorUrl = 'api';

  constructor(private http: Http) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get(`${this.doctorUrl}/doctors`)
    .map(response => response.json() as Doctor[]);
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get(`${this.doctorUrl}/doctor/${id}`)
    .map(response => response.json() as Doctor)
  }

}
