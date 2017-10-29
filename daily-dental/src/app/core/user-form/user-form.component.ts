import { 
    Component, 
    OnInit } from '@angular/core';
import {
    MatDialogRef,
    MatSnackBar } from '@angular/material';

import { User } from '../../shared/models/user.model'; 
import { SnackbarConfig } from '../../shared/models/snackbar-config-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    user: User;
    readonlyUser = { firstName: '', lastName: '', speciality: '', email: ''};
    snackbarConfig: SnackbarConfig;
    loadingOverlay = false;
    isRoleReception: boolean;

    constructor(
        private modalDialogRef: MatDialogRef<UserFormComponent>,
        private userService: UserService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.user = new User('', '', '', '', '', '', '', '');
        this.snackbarConfig = new SnackbarConfig();
        this.getUser();
    }

    getUser(): void {
        this.userService.getUser()
        .subscribe(resolve => {
            this.user = resolve;
            this.isRoleReception = this.user.role === 'reception';
            this.readonlyUser = { 
                firstName: this.user.firstName, 
                lastName: this.user.lastName, 
                speciality: this.user.speciality, 
                email: this.user.email, 
            };
        });
    }

    save(): void {
        this.loadingOverlay = true;
        this.userService.editUser(this.user)
        .subscribe(response => {
            const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                duration: this.snackbarConfig.duration
            });
            setTimeout(() => {
                this.modalDialogRef.close('Edit');
                window.location.reload();
            }, this.snackbarConfig.duration);
        }, error => {
            const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
                duration: this.snackbarConfig.duration
            });
            setTimeout(() => {
                this.loadingOverlay = false;
            }, this.snackbarConfig.duration);
            throw new Error(error);
        })
    }

}
