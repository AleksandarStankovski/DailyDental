import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Speciality } from '../../../shared/models/speciality.model';
import { OfficeService } from '../office/office.service';
import { SpecialityService } from '../../../core/speciality.service';
import { Office } from '../../../shared/models/office.model';

@Component({
    selector: 'app-office-form',
    templateUrl: './office-form.component.html',
    styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

    office: Office;
    specialities: Speciality[];
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MatDialogRef<OfficeFormComponent>,
        private officeService: OfficeService,
        private specialityService: SpecialityService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.office = new Office('', '', '');
        this.getAllSpecialities();
        if (this.data.officeId) {
            this.getOffice();
        }
    }

    getOffice(): void {
        this.officeService.getOffice(this.data.officeId)
        .subscribe(response => {
            this.office = response;
        });
    }

    getAllSpecialities(): void {
        this.specialityService.getAllSpecialities()
        .subscribe(response => {
            this.specialities = response;
        });
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
