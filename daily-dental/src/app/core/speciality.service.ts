import { Injectable } from '@angular/core';

import { Speciality } from '../shared/models/speciality.model';

@Injectable()
export class SpecialityService {

    getAllSpecialities(): Speciality[] {
        const specialities = [
            {
                type: 'aesthetic',
                name: 'Естетика'
            },
            {
                type: 'parodontology',
                name: 'Пародонтология'
            },
            {
                type: 'pediatrics',
                name: 'Педиатрия'
            },
            {
                type: 'endodontics',
                name: 'Ендодонтия'
            },
            {
                type: 'orthodontics',
                name: 'Ортодонтия'
            },
            {
                type: 'surgery',
                name: 'Хирургия'
            }
        ];
        return specialities;
    }

}
