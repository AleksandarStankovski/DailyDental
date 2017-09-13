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
}
