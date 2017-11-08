import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { ProfileFormComponent } from "./profile-form/profile-form.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    modalConfig: ModalConfig;

    constructor(private modalDialog: MatDialog) { }

    ngOnInit() { 
        this.modalConfig = new ModalConfig();
    }

    openModalDialog(): void {
        const modalDialogRef = this.modalDialog.open(ProfileFormComponent, {
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
    }

}
