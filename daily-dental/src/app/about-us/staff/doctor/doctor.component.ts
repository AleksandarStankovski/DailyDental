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

    @Input() doctor: Doctor;
    @Input() isAdmin: boolean;
    @Output() editDoctor: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    edit(): void {
        this.editDoctor.emit(this.doctor._id);
    }
}
