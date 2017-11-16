import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { regex } from '../../../shared/const/regex.const';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../clinic/clinic.service';

@Component({
    selector: 'app-clinic-form',
    templateUrl: './clinic-form.component.html',
    styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent implements OnInit {

    clinic: Clinic;
    loadingOverlay: boolean;
    regexEmail = regex.email;

    constructor(
        private modalDialogRef: MatDialogRef<ClinicFormComponent>,
        private clinicService: ClinicService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.clinic = new Clinic('', '', '', '', '');
        if (this.data.clinicId) {
            this.getClinic()
        }
    }

    getClinic(): void {
        this.clinicService.getClinic(this.data.clinicId)
        .subscribe(response => {
            this.clinic = response;
        });
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
