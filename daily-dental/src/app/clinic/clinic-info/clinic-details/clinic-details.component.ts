import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Clinic } from '../../../shared/models/clinic.model';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent implements OnInit {

  @Input() clinic: Clinic;
  @Output() editClinic: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  edit(): void {
    this.editClinic.emit(this.clinic._id);
  }

}
