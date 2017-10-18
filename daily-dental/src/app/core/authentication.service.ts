import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { User } from '../shared/models/user.model';

@Injectable()
export class AuthenticationService {

    private apiUrl: string = 'api';

    constructor(private http: Http) { }

    getUser(): Observable<User> {
        return this.http.get(`${this.apiUrl}/user`)
        .map(response => response.json() as User);
    }

    isAdmin(): Observable<boolean>{
        return this.http.get(`${this.apiUrl}/user`)
        .map(response => {
            let user: User = response.json() as User;
            let isAdmin: boolean = false;
            if (user.role === 'admin') {
                isAdmin = true;
            } 
            return isAdmin;
        })
    }

}