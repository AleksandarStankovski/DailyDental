import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Appointment } from '../../shared/models/appointment.model';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

    endTime: number;
    @Input() appointment: Appointment;
    @Output() editAppointmentEvent: EventEmitter<string> = new EventEmitter();

    constructor(private appointmentService: AppointmentService) { }

    ngOnInit() {
        this.getEndTime();
    }

    getEndTime(): void {
        this.endTime = this.appointment.startTime + this.appointment.duration;
    }

    editAppointment(): void {
        this.editAppointmentEvent.emit(this.appointment._id);
    }

}
