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
    isValidSpeciality: boolean

    constructor(
        private modalDialogRef: MatDialogRef<ManipulationFormComponent>,
        private manipulationService: ManipulationService,
        private specialityService: SpecialityService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.manipulation = new Manipulation('', undefined, { name: '', value: '' });
        this.getAllSpecialities();
        if (this.data.manipulationId) {
            this.getManipulation();
        }
    }

    getManipulation(): void {
        this.manipulationService.getManipultion(this.data.manipulationId)
        .subscribe(response => {
            this.manipulation = response;
            this.checkValidSpeciality(this.manipulation.speciality);
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

    selectSpeciality(optionValue, selectedValue) {
        if (selectedValue) {
            return optionValue.value === selectedValue.value;
        }
        return false;
    }

    checkValidSpeciality(speciality: Speciality): void {
        if (speciality.value) {
            this.isValidSpeciality = speciality.value.length > 0;
        }
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
