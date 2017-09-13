import { Component, OnInit, Input } from '@angular/core';

import { Clinic } from '../../../shared/models/clinic.model';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent implements OnInit {

  @Input() clinic: Clinic;

  constructor() { }

  ngOnInit() {
  }

}
