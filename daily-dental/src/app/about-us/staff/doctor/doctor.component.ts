import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Doctor } from '../../../shared/models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

    isRoleReception: boolean;
    @Input() doctor: Doctor;
    @Input() isRoleUser: boolean;
    @Output() editDoctorEvent: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { 
        this.isRoleReception = this.doctor.role === 'reception';
    }

    editDoctor(): void {
        this.editDoctorEvent.emit(this.doctor._id);
    }
}
