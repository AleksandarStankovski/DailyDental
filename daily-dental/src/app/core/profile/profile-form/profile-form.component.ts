import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { User } from '../../../shared/models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

    user: User;
    loadingOverlay = false;
    isRoleReception: boolean;

    constructor(
        private modalDialogRef: MatDialogRef<ProfileFormComponent>,
        private userService: UserService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.user = new User('', '', '', '', '', '', '');
        this.getUser();
    }

    getUser(): void {
        this.userService.getUser()
        .subscribe(resolve => {
            this.user = resolve;
            this.isRoleReception = this.user.role === 'reception';
        });
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
        if (type === 'Edit') {
            window.location.reload();
        }
    }

}
