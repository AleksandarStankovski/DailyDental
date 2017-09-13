import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Clinic } from '../../shared/models/clinic.model';
import { ClinicInfoService } from './clinic-info.service';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnInit {

  clinics: Clinic[];
  clinic: Clinic;

  constructor(
    private modalDialog: MdDialog,
    private clinicInfoService: ClinicInfoService) { }

  ngOnInit() {
    this.clinics = [
      new Clinic('', '', '', '', '')
    ]
    this.getAllClinics();
  }

  getAllClinics(): void {
    this.clinicInfoService.getAllClinics()
    .subscribe(resolve => {
      this.clinics = resolve;
      this.clinic = resolve[0];
    })
  }

  openModalDialog(): void {

  }

  addClinic(): void {
  }

}
