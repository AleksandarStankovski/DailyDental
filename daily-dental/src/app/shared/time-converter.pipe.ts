import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case 8: {
                value = '08:00'
                break;
            }
            case 9: {
                value = '09:00'
                break;
            }
            case 10: {
                value = '10:00'
                break;
            }
            case 11: {
                value = '11:00'
                break;
            }
            case 12: {
                value = '12:00'
                break;
            }
            case 13: {
                value = '13:00'
                break;
            }
            case 14: {
                value = '14:00'
                break;
            }
            case 15: {
                value = '15:00'
                break;
            }
            case 16: {
                value = '16:00'
                break;
            }
            case 17: {
                value = '17:00'
                break;
            }
            case 18: {
                value = '18:00'
                break;
            }
            case 19: {
                value = '19:00'
                break;
            }
            case 20: {
                value = '20:00'
                break;
            }
            default: {
                value = ''
            }
        }
        return value;
    }

}
