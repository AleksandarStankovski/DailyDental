import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentHoursService {
    constructor() { }
    
    getAllHours(): { name: string, value: number }[] {
        let hours = [
            {
                name: '08:00',
                value: 8
            },
            {
                name: '09:00',
                value: 9
            },
            {
                name: '10:00',
                value: 10
            },
            {
                name: '11:00',
                value: 11
            },
            {
                name: '12:00',
                value: 12
            },
            {
                name: '13:00',
                value: 13
            },
            {
                name: '14:00',
                value: 14
            },
            {
                name: '15:00',
                value: 15
            },
            {
                name: '16:00',
                value: 16
            },
            {
                name: '17:00',
                value: 17
            },
            {
                name: '18:00',
                value: 18
            },
            {
                name: '19:00',
                value: 19
            }
        ];
        return hours;
    }

}