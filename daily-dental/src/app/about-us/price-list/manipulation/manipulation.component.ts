import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Manipulation } from '../../../shared/models/manipulation.model';
import { ManipulationService } from './manipulation.service';

@Component({
    selector: 'app-manipulation',
    templateUrl: './manipulation.component.html',
    styleUrls: ['./manipulation.component.scss']
})
export class ManipulationComponent {

    @Input() manipulation: Manipulation;
    @Input() isRoleUser: boolean;
    @Output() editManipulationEvent: EventEmitter<string> = new EventEmitter();

    constructor(private manipulationService: ManipulationService) { }

    editManipulation(): void {
        this.editManipulationEvent.emit(this.manipulation._id);
    }

}
