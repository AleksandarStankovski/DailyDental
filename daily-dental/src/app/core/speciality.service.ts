import { Injectable } from '@angular/core';

@Injectable()
export class SpecialityService {

    getAllSpecialities(): { type: string, name: string }[]{
        let specialities = [
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