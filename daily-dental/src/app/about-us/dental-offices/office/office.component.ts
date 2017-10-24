import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Office } from '../../../shared/models/office.model';

@Component({
    selector: 'app-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

    @Input() office: Office;
    @Input() isRoleUser: boolean;
    @Output() editOffice: EventEmitter<string> = new EventEmitter()

    constructor() { }

    ngOnInit() {}

    edit(): void {
        this.editOffice.emit(this.office._id);
    }
}
