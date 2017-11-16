import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'doctorActiveConverter'
})
export class DoctorActiveConverterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case true: {
                value = 'Активен'
                break;
            }
            case false: {
                value = 'Неактивен'
                break;
            }
        }
        return value;
    }

}
