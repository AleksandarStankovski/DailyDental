import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Patient } from '../../shared/models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @Input() patient: Patient;
  @Output() editPatient: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(): void {
    this.editPatient.emit(this.patient._id);
  }

}
