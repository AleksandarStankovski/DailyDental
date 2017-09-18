import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
     MdDialogRef,
     MD_DIALOG_DATA } from '@angular/material';

import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../clinic/clinic.service';

@Component({
    selector: 'app-clinic-form',
    templateUrl: './clinic-form.component.html',
    styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent implements OnInit {

    clinic: Clinic;

    constructor(
        private modalDialogRef: MdDialogRef<ClinicFormComponent>,
        private clinicService: ClinicService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

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
        })
    }

    save(): void {
        if (this.data.clinicId) {
            this.clinicService.editClinic(this.clinic)
            .subscribe(response => {
                this.modalDialogRef.close('Edit')
            })
        } else {
            this.clinicService.createClinic(this.clinic)
            .subscribe(response => {
                this.modalDialogRef.close('Create')
            })
        }
    }
}
