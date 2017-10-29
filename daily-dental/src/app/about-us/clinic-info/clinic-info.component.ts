import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Clinic } from '../../shared/models/clinic.model';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';
import { ClinicService } from './clinic/clinic.service';
import { UserService } from '../../core/user.service';

@Component({
    selector: 'app-clinic-info',
    templateUrl: './clinic-info.component.html',
    styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnInit {

    clinics: Clinic[];
    clinic: Clinic;
    modalConfig: ModalConfig;
    tutorialText: string;
    isRoleUser: boolean;

    constructor(
        private modalDialog: MatDialog,
        private clinicService: ClinicService,
        private userService: UserService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.isisRoleUserCheck();
    }

    isisRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
        });
        this.getAllClinics();
    }

    getAllClinics(): void {
        this.clinicService.getAllClinics()
        .subscribe(resolve => {
            this.clinics = resolve;
            this.clinic = resolve[0];
            if (this.clinics.length === 0) {
                this.tutorialText = 'Кликнете тук за да създадете клиника';
            } else {
                this.tutorialText = undefined;
            }
        });
    }

    openModalDialog(clinicId?: string): void {
        const id = clinicId || undefined;
        const modalDialogRef = this.modalDialog.open(ClinicFormComponent, {
            width: this.modalConfig.width,
            data: { clinicId: id },
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed().subscribe(result => {
            this.getAllClinics();
        })
    }

    editClinic(clinicId): void {
        this.openModalDialog(clinicId);
    }

}
