import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

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

    constructor(
        private modalDialog: MdDialog,
        private clinicService: ClinicService) { }

    ngOnInit() {
        this.getAllClinics();
    }

    getAllClinics(): void {
        this.clinicService.getAllClinics()
        .subscribe(resolve => {
        this.clinics = resolve;
        })
    }

    openModalDialog(clinicId?: string): void {
        const id = clinicId || undefined;
        const modalDialogRef = this.modalDialog.open(ClinicFormComponent, {
        data: { clinicId: id }
        })
    }

    addClinic(): void {
        this.openModalDialog();
    }

    editClinic(clinicId): void {
        this.openModalDialog(clinicId);
    }
}
