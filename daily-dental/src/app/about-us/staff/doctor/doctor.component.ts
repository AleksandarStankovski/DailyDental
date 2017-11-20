import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Doctor } from '../../../shared/models/doctor.model';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

    isRoleReception: boolean;
    image: string;
    @Input() doctor: Doctor;
    @Input() isRoleUser: boolean;
    @Output() editDoctorEvent: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.isRoleReception = this.doctor.role === 'reception';
        this.getImage();
    }

    getImage(): void {
        if (this.isRoleReception) {
            this.image = 'default.jpg';
        } else {
            if (this.doctor.speciality) {
                this.image = this.doctor.speciality.doctorImage;
            }
        }
    }

    editDoctor(): void {
        this.editDoctorEvent.emit(this.doctor._id);
    }

}
