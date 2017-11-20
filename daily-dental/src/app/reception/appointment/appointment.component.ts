import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Appointment } from '../../shared/models/appointment.model';
import { Hour } from '../../shared/models/hour.model';
import { AppointmentService } from './appointment.service';
import { AppointmentHourService } from '../appointment-form/appointment-hour.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

    endTime: Hour;
    @Input() appointment: Appointment;
    @Output() editAppointmentEvent: EventEmitter<string> = new EventEmitter();

    constructor(
        private appointmentService: AppointmentService,
        private appointmentHourService: AppointmentHourService) { }

    ngOnInit() {
        this.getEndTime();
    }

    getEndTime(): void {
        this.appointmentHourService.getAllHours()
        .subscribe(response => {
            const hours: Hour[] = response;
            const endTimeValue = this.appointment.startTime.value + this.appointment.duration;
            let endTimeName
            hours.forEach(item => {
                if (item.value === endTimeValue) {
                    endTimeName = item.name;
                }
            })
            this.endTime = {
                name: endTimeName,
                value: endTimeName
            }
        });
    }

    editAppointment(): void {
        this.editAppointmentEvent.emit(this.appointment._id);
    }

}
