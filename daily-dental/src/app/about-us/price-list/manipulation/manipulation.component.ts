import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Manipulation } from '../../../shared/models/manipulation.model';

@Component({
    selector: 'app-manipulation',
    templateUrl: './manipulation.component.html',
    styleUrls: ['./manipulation.component.scss']
})
export class ManipulationComponent implements OnInit {

    @Input() manipulation: Manipulation;
    @Output() editManipulation: EventEmitter<string> = new EventEmitter();
    manipulationIcon: string;

    constructor() { }

    ngOnInit() {}

    edit(): void {
        this.editManipulation.emit(this.manipulation._id);
    }

    getIcon(): string {
        switch(this.manipulation.type) {
            case 'aesthetic': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            case 'parodontology': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            case 'pediatrics': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            case 'endodontics': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            case 'orthodontics': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            case 'surgery': {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
                break;
            }
            default: {
                this.manipulationIcon = 'flaticon-dental-prosthesis'
            }
        }
        return this.manipulationIcon;
    }
}
