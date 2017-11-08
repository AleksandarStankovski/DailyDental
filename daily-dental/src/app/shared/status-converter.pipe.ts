import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusConverter'
})
export class StatusConverterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch(value) {
            case 'confirmed': {
                value = 'Потвърден'
                break;
            }
            case 'unconfirmed': {
                value = 'Непотвърден'
                break;
            }
            case 'arrived': {
                value = 'Пристигнал'
                break;
            }
            case 'current': {
                value = 'Текущ'
                break;
            }
            case 'finished': {
                value = 'Завършен'
                break;
            }
            case 'late': {
                value = 'Закаснява'
                break;
            }
            case 'missing': {
                value = 'Липсващ'
                break;
            }
            case 'canceled': {
                value = 'Отменен'
                break;
            }
            case 'urgent': {
                value = 'Спешен'
                break;
            }
            default: {
                value = ''
            }
        }
        return value;
    }

}
