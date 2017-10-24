import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Manipulation } from '../../../shared/models/manipulation.model';
import { ManipulationService } from './manipulation.service';

@Component({
    selector: 'app-manipulation',
    templateUrl: './manipulation.component.html',
    styleUrls: ['./manipulation.component.scss']
})
export class ManipulationComponent implements OnInit {

    manipulationIcon: string;
    @Input() manipulation: Manipulation;
    @Input() isRoleUser: boolean;
    @Output() editManipulation: EventEmitter<string> = new EventEmitter();
    
    constructor(private manipulationService: ManipulationService) { }

    ngOnInit() {
        this.getIcon();
    }

    edit(): void {
        this.editManipulation.emit(this.manipulation._id);
    }

    getIcon(): void {
        this.manipulationIcon = this.manipulationService.getIcon(this.manipulation.type);
    }
}
