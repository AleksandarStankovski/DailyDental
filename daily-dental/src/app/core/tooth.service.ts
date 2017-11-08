import { Injectable } from '@angular/core';

@Injectable()
export class ToothService {

    getAllTeeth(): { position: string, name: string }[] {
        let teeth = [
            {
                position: 'b1',
                name: 'b1'
            },{
                position: 'b2',
                name: 'b2'
            },
            {
                position: 'b3',
                name: 'b3'
            },
        ];
        return teeth;
    }

}
