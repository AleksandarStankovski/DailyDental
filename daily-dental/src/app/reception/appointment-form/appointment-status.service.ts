import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentStatusService {
    
    getAllStatuses(): { type: string, name: string }[] {
        let statuses = [
            {
                type: 'confirmed',
                name: 'Потвърден'
            },
            {
                type: 'unconfirmed',
                name: 'Непотвърден'
            },
            {
                type: 'arrived',
                name: 'Пристигнал'
            },
            {
                type: 'current',
                name: 'Текущ'
            },
            {
                type: 'finished',
                name: 'Завършен'
            },
            {
                type: 'late',
                name: 'Закаснява'
            },
            {
                type: 'missing',
                name: 'Липсващ'
            },
            {
                type: 'canceled',
                name: 'Отменен'
            },
            {
                type: 'urgent',
                name: 'Спешен'
            }
        ];
        return statuses;
    }

}