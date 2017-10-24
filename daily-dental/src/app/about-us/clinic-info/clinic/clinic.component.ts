import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Clinic } from '../../../shared/models/clinic.model';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.component.html',
    styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

    @Input() clinic: Clinic;
    @Input() isRoleUser: boolean;
    @Output() editClinic: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    edit(): void {
        this.editClinic.emit(this.clinic._id);
    }
}
