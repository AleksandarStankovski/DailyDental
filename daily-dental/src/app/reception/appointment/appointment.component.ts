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
    appointmentIcon: string;
    @Input() appointment: Appointment;
    @Output() editAppointment: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { 
        this.getEndTime();
        this.getTotalPrice();
        this.getIcon();
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

    getIcon(): void {
        let icon;
        switch(this.appointment.status) {
            case 'confirmed': {
                icon = 'icon-like'
                break;
            }
            case 'unconfirmed': {
                icon = 'icon-question'
                break;
            }
            case 'arrived': {
                icon = 'icon-home-fill'
                break;
            }
            case 'current': {
                icon = 'icon-current'
                break;
            }
            case 'finished': {
                icon = 'icon-done'
                break;
            }
            case 'late': {
                icon = 'icon-time'
                break;
            }
            case 'missing': {
                icon = 'icon-blocked'
                break;
            }
            case 'canceled': {
                icon = 'icon-close'
                break;
            }
            case 'urgent': {
                icon = 'icon-danger'
                break;
            }
            default: {
                icon = 'icon-home-fill'
            }
        }
        this.appointmentIcon = icon;
    }

}
