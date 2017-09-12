import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Manipulation } from '../../../shared/models/manipulation.model';

@Injectable()
export class ManipulationService {

  private manipulationUrl = 'api';

  constructor(private http: Http) {}

  getAllManipulations(): Observable<Manipulation[]> {
    return this.http.get(`${this.manipulationUrl}/manipulations`)
    .map(response => response.json() as Manipulation[]);
  }

  getManipultion(id: string): Observable<Manipulation> {
    console.log(`Get manipulation with id: ${id}`);
    return this.http.get(`${this.manipulationUrl}/manipulation/${id}`)
    .map(response => response.json() as Manipulation);
  }

  createManipulation(data: Manipulation): Observable<any> {
    console.log(`Create manipulation: ${data}`);
    return this.http.post(`${this.manipulationUrl}/manipulation/create`, data)
    .map(response => response.json());
  }

  editManipulation(data: Manipulation): Observable<any> {
    console.log(`Edit manipulation: ${data}`);
    return this.http.post(`${this.manipulationUrl}/manipulation/edit`, data)
    .map(response => response.json());
  }

  deleteManipulation(id: string): Observable<any> {
    console.log(`Delete manipulation with id: ${id}`);
    return this.http.delete(`${this.manipulationUrl}/manipulation/${id}`)
    .map(response => response.json());
  }

}
