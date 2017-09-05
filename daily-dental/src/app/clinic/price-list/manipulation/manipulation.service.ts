import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Manipulation } from '../../../shared/models/manipulation.model';

@Injectable()
export class ManipulationService {

  private http: Http;
  private manipulationUrl = 'api';

  constructor(http: Http) {
    this.http = http;
  }

  getAllManipulations(): Observable<Manipulation[]> {
    return this.http.get(`${this.manipulationUrl}/manipulations`)
    .map(response => response.json() as Manipulation[]);
  }

  getManipultion(id: string): Observable<Manipulation> {
    return this.http.get(`${this.manipulationUrl}/manipulation/${id}`)
    .map(response => response.json() as Manipulation);
  }

  createManioulation(data: Manipulation): Observable<any> {
    return this.http.post(`${this.manipulationUrl}/manipulation/create`, data)
    .map(response => response.json());
  }

  editManipulation(data: Manipulation): Observable<any> {
    return this.http.post(`${this.manipulationUrl}/manipulation/edit`, data)
    .map(response => response.json());
  }

  deleteManipulation(id: string): Observable<any> {
    return this.http.delete(`${this.manipulationUrl}/manipulation/${id}`)
    .map(response => response.json());
  }

}
