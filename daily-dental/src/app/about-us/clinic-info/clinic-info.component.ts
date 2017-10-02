import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Clinic } from '../../shared/models/clinic.model';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';
import { ClinicService } from './clinic/clinic.service';

@Component({
    selector: 'app-clinic-info',
    templateUrl: './clinic-info.component.html',
    styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnInit {

    clinics: Clinic[];
    clinic: Clinic;
    modalConfig: ModalConfig;

    constructor(
        private modalDialog: MdDialog,
        private clinicService: ClinicService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.getAllClinics();
    }

    getAllClinics(): void {
        this.clinicService.getAllClinics()
        .subscribe(resolve => {
            this.clinics = resolve;
            this.clinic = resolve[0];
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

    addClinic(): void {
        this.openModalDialog();
    }

    editClinic(clinicId): void {
        this.openModalDialog(clinicId);
    }

}
