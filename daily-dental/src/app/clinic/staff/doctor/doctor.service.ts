import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Doctor } from '../../../shared/models/doctor.model';

@Injectable()
export class DoctorService {

  private http: Http;
  private doctorUrl = 'api';

  constructor(http: Http) {
    this.http = http;
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get(`${this.doctorUrl}/doctors`)
    .map(response => response.json() as Doctor[]);
  }

}
