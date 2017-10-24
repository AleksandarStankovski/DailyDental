import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { User } from '../shared/models/user.model';

@Injectable()
export class UserService {

    private apiUrl: string = 'api';

    constructor(private http: Http) { }

    getUser(): Observable<User> {
        return this.http.get(`${this.apiUrl}/user`)
        .map(response => response.json() as User);
    }

    editUser(data: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/user/edit`, data)
        .map(response => response.json());
    }

    isRoleUser(): Observable<boolean>{
        return this.http.get(`${this.apiUrl}/user`)
        .map(response => {
            let user: User = response.json() as User;
            let isRoleUser: boolean = false;
            if (user.role === 'user') {
                isRoleUser = true;
            } 
            return isRoleUser;
        })
    }

}