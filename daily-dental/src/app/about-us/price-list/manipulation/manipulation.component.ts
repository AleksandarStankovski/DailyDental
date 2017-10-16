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

    manipulationIcon: string;
    @Input() manipulation: Manipulation;
    @Output() editManipulation: EventEmitter<string> = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
        this.getIcon();
    }

    edit(): void {
        this.editManipulation.emit(this.manipulation._id);
    }

    getIcon(): void {
        let icon;
        switch(this.manipulation.type) {
            case 'aesthetic': {
                icon = 'icon-tooth-3'
                break;
            }
            case 'parodontology': {
                icon = 'icon-parodontology'
                break;
            }
            case 'pediatrics': {
                icon = 'icon-pediatrics'
                break;
            }
            case 'endodontics': {
                icon = 'icon-endodontics'
                break;
            }
            case 'orthodontics': {
                icon = 'icon-braces-2'
                break;
            }
            case 'surgery': {
                icon = 'icon-implant-2'
                break;
            }
            default: {
                icon = 'icon-tooth-5'
            }
        }
        this.manipulationIcon = icon;
    }
}
