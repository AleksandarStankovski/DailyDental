import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Appointment } from '../../shared/models/appointment.model';
import { Doctor } from '../../shared/models/doctor.model';

@Injectable()
export class AppointmentService {

    private apiUrl = 'api';

    constructor(private http: Http) { }

    getAllAppointments(): Observable<Appointment[]> {
        return this.http.get(`${this.apiUrl}/appointments`)
        .map(response => response.json() as Appointment[]);
    }

    getAppointmentByDate(date: Date): Observable<Doctor[]> {
        return this.http.get(`${this.apiUrl}/appointments/${date}`)
        .map(response => response.json() as Doctor[]);
    }

    getAppointment(id: string): Observable<Appointment> {
        return this.http.get(`${this.apiUrl}/appointment/${id}`)
        .map(response => response.json() as Appointment);
    }

    createAppointment(data: Appointment): Observable<any> {
        return this.http.post(`${this.apiUrl}/appointment/create`, data)
        .map(response => response.json());
    }

    editAppointment(data: Appointment): Observable<any> {
        return this.http.put(`${this.apiUrl}/appointment/edit`, data)
        .map(response => response.json());
    }

    deleteAppointment(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/appointment/delete/${id}`)
        .map(response => response.json());
    }

}
