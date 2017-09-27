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
                this.manipulationIcon = 'icon-tooth-3'
                break;
            }
            case 'parodontology': {
                this.manipulationIcon = 'icon-parodontology'
                break;
            }
            case 'pediatrics': {
                this.manipulationIcon = 'icon-pediatrics'
                break;
            }
            case 'endodontics': {
                this.manipulationIcon = 'icon-endodontics'
                break;
            }
            case 'orthodontics': {
                this.manipulationIcon = 'icon-braces-2'
                break;
            }
            case 'surgery': {
                this.manipulationIcon = 'icon-implant-2'
                break;
            }
            default: {
                this.manipulationIcon = 'icon-tooth-5'
            }
        }
        return this.manipulationIcon;
    }
}
