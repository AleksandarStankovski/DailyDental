import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Clinic } from '../../shared/models/clinic.model';
import { ClinicDetailsService } from './clinic-details/clinic-details.service';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnInit {

  clinics: Clinic[];

  constructor(
    private modalDialog: MdDialog,
    private clinicDetailsService: ClinicDetailsService) { }

  ngOnInit() {
    this.getAllClinics();
  }

  getAllClinics(): void {
    this.clinicDetailsService.getAllClinics()
    .subscribe(resolve => {
      this.clinics = resolve;
    })
  }

  openModalDialog(): void {

  }

  addClinic(): void {
  }

  editClinic(): void {

  }

}
