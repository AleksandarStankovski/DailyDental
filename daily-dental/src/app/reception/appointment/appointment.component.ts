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

    endTime: number;
    totalPrice: number;
    @Input() appointment: Appointment;
    @Output() editAppointment: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { 
        this.getEndTime();
        this.getTotalPrice();
    }

    getEndTime(): void {
        this.endTime = this.appointment.startTime + this.appointment.duration;
    }

    getTotalPrice(): void {
        let total = 0;
        this.appointment.manipulations.forEach(manipulation => {
            total = total + manipulation.price;
        })
        this.totalPrice = total;
    }

    edit(): void {
        this.editAppointment.emit(this.appointment._id);
    }

}
