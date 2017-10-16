import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialityConverter'
})
export class SpecialityConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
        case 'aesthetic': {
            value = 'Естетика'
            break;
        }
        case 'parodontology': {
            value = 'Пародонтология'
            break;
        }
        case 'pediatrics': {
            value = 'Педиатрия'
            break;
        }
        case 'endodontics': {
            value = 'Ендодонтия'
            break;
        }
        case 'orthodontics': {
            value = 'Ортодонтия'
            break;
        }
        case 'surgery': {
            value = 'Хирургия'
            break;
        }
        default: {
            value = 'Общ'
        }
    }
    return value;
  }

}
