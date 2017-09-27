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
                this.manipulationIcon = 'flaticon-008-health-care'
                break;
            }
            case 'parodontology': {
                this.manipulationIcon = 'flaticon-010-tooth-9'
                break;
            }
            case 'pediatrics': {
                this.manipulationIcon = 'flaticon-024-toothbrush-1'
                break;
            }
            case 'endodontics': {
                this.manipulationIcon = 'flaticon-030-tooth-2'
                break;
            }
            case 'orthodontics': {
                this.manipulationIcon = 'flaticon-038-brackets'
                break;
            }
            case 'surgery': {
                this.manipulationIcon = 'flaticon-021-tooth-4'
                break;
            }
            default: {
                this.manipulationIcon = 'flaticon-040-teeth'
            }
        }
        return this.manipulationIcon;
    }
}
