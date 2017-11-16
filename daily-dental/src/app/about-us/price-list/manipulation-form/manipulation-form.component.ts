import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Speciality } from '../../../shared/models/speciality.model';
import { Manipulation } from '../../../shared/models/manipulation.model';
import { ManipulationService } from '../manipulation/manipulation.service';
import { SpecialityService } from '../../../core/speciality.service';

@Component({
    selector: 'app-manipulation-form',
    templateUrl: './manipulation-form.component.html',
    styleUrls: ['./manipulation-form.component.scss']
})
export class ManipulationFormComponent implements OnInit {

    manipulation: Manipulation;
    specialities: Speciality[];
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MatDialogRef<ManipulationFormComponent>,
        private manipulationService: ManipulationService,
        private specialityService: SpecialityService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.manipulation = new Manipulation('', undefined, '');
        this.getAllSpecialities();
        if (this.data.manipulationId) {
            this.getManipulation();
        }
    }

    getManipulation(): void {
        this.manipulationService.getManipultion(this.data.manipulationId)
        .subscribe(response => {
            this.manipulation = response;
        });
    }

    getAllSpecialities(): void {
        this.specialityService.getAllSpecialities()
        .subscribe(response => {
            this.specialities = response;
        });
    }

    changePrice(value: number): void {
        this.manipulation.price = value;
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
