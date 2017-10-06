import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Appointment } from '../../shared/models/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

    @Input() appointment: Appointment;
    @Output() editAppointment: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    edit(): void {
        this.editAppointment.emit(this.appointment._id);
    }

}
