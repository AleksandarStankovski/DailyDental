import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Clinic } from '../../shared/models/clinic.model';
import { ClinicService } from './clinic/clinic.service';
import { UserService } from '../../core/user.service';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';

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
        private activatedRoute: ActivatedRoute,
        private modalDialog: MatDialog,
        private clinicService: ClinicService,
        private userService: UserService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.isRoleUserCheck();
    }

    isRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
        });
        this.getAllClinicsFromResolve();
    }

    getAllClinicsFromResolve(): void {
        this.clinics = this.activatedRoute.snapshot.data['clinics'];
        this.clinic = this.clinics[0];
        this.toggleTutorialText();
    }

    getAllClinics(): void {
        this.clinicService.getAllClinics()
        .subscribe(response => {
            this.clinics = response;
            this.clinic = response[0];
            this.toggleTutorialText();
        });
    }

    toggleTutorialText(): void {
        if (this.clinics.length === 0) {
            this.tutorialText = 'Кликнете тук за да създадете клиника';
        } else {
            this.tutorialText = undefined;
        }
    }

    openModalDialog(clinicId?: string): void {
        const id = clinicId;
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
